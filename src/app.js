(function attachAppModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});
  const dependencies = typeof module !== 'undefined' && module.exports
    ? {
        ...require('./trace.js'),
        ...require('./stats.js'),
        ...require('./report.js'),
        ...require('./measurement-sets.js'),
        ...require('./ui.js'),
      }
    : HermesPerfAnalyzer;
  const {
    $, 
    GROUPS,
    buildBackendContextLabels,
    buildBackendGroups,
    buildComparisonRows,
    buildComparisonTextReport,
    buildTextReport,
    classifyRelativeValue,
    colorClass,
    computeStats,
    copyToClipboard,
    createMeasurementSetsExport,
    describeSampleConfidence,
    downloadJsonFile,
    escapeHtml,
    extract,
    fmt,
    fmtMs,
    formatSigned,
    iconLabelMarkup,
    iconMarkup,
    loadMeasurementSets,
    mergeMeasurementSets,
    metricReadingMarkup,
    nextSetName,
    normalizeTrace,
    parseMeasurementSetsImport,
    persistMeasurementSets,
    selectSetForComparison,
    serializeSetTracesForInputs,
    shouldAppendTrailingTrace,
  } = dependencies;

  let lastTextReport = '';
  let lastComparisonReport = '';
  let traceCount = 0;
  let currentTraces = [];
  let measurementSets = [];
  let selectedSetIds = [];
  let measurementStorage = null;

  const SAMPLE_METRICS = [
    { key: 'elapsedMs', label: 'Elapsed', read: (row) => row.elapsedMs, primary: true },
    { key: 'rpcDuration', label: 'RPC', read: (row) => row.rpcDuration },
    { key: 'preRepoBuiltAt', label: 'Pre-RPC repo', read: (row) => row.preRepoBuiltAt, visible: (row) => row._format === 'new' },
    { key: 'coldViewAt', label: 'View ready', read: (row) => row.coldViewAt },
    { key: 'paintWaitDur', label: 'Paint wait', read: (row) => row.paintWaitDur },
    { key: 'raf2WaitMs', label: 'raf-2 wait', read: (row) => row.raf2WaitMs },
    { key: 'backendHandlerMs', label: 'BE handler', read: (row) => row.backend.handlerMs, visible: (row) => row._hasBackend },
    { key: 'outsideHandlerMs', label: 'outside RTT', read: (row) => row.backend.outsideHandlerMs, visible: (row) => row._hasBackend },
  ];

  const SAMPLE_STATUS_PRIORITY = {
    typical: 0,
    fast: 0,
    slow: 1,
    outlier: 2,
  };

  function relativeMetricTitle(metric, comparison) {
    if (comparison.sampleCount < 3 || !Number.isFinite(comparison.baseline)) {
      return `${metric.label}: not enough comparable samples`;
    }
    const delta = Number.isFinite(comparison.percent) ? ` (${formatSigned(comparison.percent, '%')} vs median)` : '';
    return `${metric.label}: median ${fmt(comparison.baseline)} ms${delta}`;
  }

  function renderRelativeMetric(metric, row, distributions) {
    const value = metric.read(row);
    const comparison = classifyRelativeValue(value, distributions[metric.key]);
    const title = escapeHtml(relativeMetricTitle(metric, comparison));
    return {
      comparison,
      markup: `<span class="sc-metric-value sc-relative-${comparison.key}" title="${title}">${fmt(value)} ms</span>`,
    };
  }

  function copyTextReport() {
    return copyToClipboard(lastTextReport, $('copyReportButton'), 'Copied', 'Copy report');
  }

  function copyComparisonReport() {
    return copyToClipboard(lastComparisonReport, $('copyComparisonButton'), 'Copied', 'Copy comparison');
  }

  function downloadTextReport() {
    if (!lastTextReport) return;
    const url = URL.createObjectURL(new Blob([lastTextReport], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hermes-cold-resume-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  function loadTraceValuesIntoInputs(values) {
    $('tracesWrapper').innerHTML = '';
    traceCount = 0;
    currentTraces = [];
    setSaveAvailability(false);
    resetResults();
    values.forEach((value) => addTrace(value));
    ensureTrailingEmptyTrace();
  }

  function focusAnalyzeButton(message) {
    $('parseInfo').textContent = message;
    const analyzeButton = $('analyzeButton');
    analyzeButton.focus({ preventScroll: true });
    analyzeButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function setSetsStatus(message, isError = false) {
    const status = $('setsStatus');
    status.textContent = message;
    status.classList.toggle('error', isError);
  }

  function exportMeasurementSets() {
    if (!measurementSets.length) return;
    const date = new Date().toISOString().slice(0, 10);
    downloadJsonFile(createMeasurementSetsExport(measurementSets), `hermes-measurement-sets-${date}.json`);
    setSetsStatus(`Exported ${measurementSets.length} set(s).`);
  }

  async function importMeasurementSets(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const importedSets = parseMeasurementSetsImport(await file.text());
      const merged = mergeMeasurementSets(measurementSets, importedSets);
      if (!persistMeasurementSets(measurementStorage, merged.sets)) {
        throw new Error('Browser storage is unavailable or full');
      }
      measurementSets = merged.sets;
      renderMeasurementSets();
      setSetsStatus(`Imported ${merged.added} set(s)${merged.skipped ? `, skipped ${merged.skipped} existing` : ''}.`);
    } catch (error) {
      setSetsStatus(`Import failed: ${error.message}`, true);
    } finally {
      input.value = '';
    }
  }

  function setSaveAvailability(enabled) {
    $('saveSetButton').disabled = !enabled;
  }

  function invalidateCurrentAnalysis() {
    currentTraces = [];
    setSaveAvailability(false);
    resetResults();
  }

  function renderComparison() {
    const selectedSets = selectedSetIds
      .map((id) => measurementSets.find((set) => set.id === id))
      .filter(Boolean);
    const section = $('comparisonSection');
    if (selectedSets.length !== 2) {
      lastComparisonReport = '';
      $('comparisonReportOutput').textContent = '';
      $('copyComparisonButton').textContent = 'Copy comparison';
      section.hidden = true;
      return;
    }

    const [setA, setB] = selectedSets;
    const rowsA = setA.traces.map(normalizeTrace).map(extract);
    const rowsB = setB.traces.map(normalizeTrace).map(extract);
    const comparisonRows = buildComparisonRows(rowsA, rowsB);

    $('comparisonTitle').textContent = `${setA.name} vs ${setB.name}`;
    $('comparisonAHead').textContent = `${setA.name} · p50`;
    $('comparisonBHead').textContent = `${setB.name} · p50`;
    $('comparisonBody').innerHTML = comparisonRows.map((row) => {
      const cls = deltaClass(row.delta);
      return `<tr>
        <td class="comparison-metric">${row.label}</td>
        <td class="td-num">${fmtMs(row.valueA)}</td>
        <td class="td-num">${fmtMs(row.valueB)}</td>
        <td class="td-num ${cls}">${formatSigned(row.delta, ' ms')}</td>
        <td class="td-num ${cls}">${formatSigned(row.percent, '%')}</td>
      </tr>`;
    }).join('');
    lastComparisonReport = buildComparisonTextReport(setA, setB, comparisonRows, rowsA, rowsB);
    $('comparisonReportOutput').textContent = lastComparisonReport;
    $('copyComparisonButton').textContent = 'Copy comparison';
    section.hidden = false;
  }

  function renderMeasurementSets() {
    selectedSetIds = selectedSetIds.filter((id) => measurementSets.some((set) => set.id === id));
    $('setsEmpty').hidden = measurementSets.length > 0;
    $('exportSetsButton').disabled = measurementSets.length === 0;
    $('setNameInput').placeholder = nextSetName(measurementSets.length);
    $('setCards').innerHTML = measurementSets.map((set) => {
      const rows = set.traces.map(normalizeTrace).map(extract);
      const medianElapsed = computeStats(rows, 'elapsedMs')?.med;
      const selected = selectedSetIds.includes(set.id);
      const comparisonRole = selected ? ['A', 'B'][selectedSetIds.indexOf(set.id)] : '';
      const createdAt = Number.isFinite(set.createdAt)
        ? new Date(set.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
        : '';
      return `<article class="set-card${selected ? ' selected' : ''}" data-set-id="${escapeHtml(set.id)}">
        <div class="set-card-head">
          <label class="set-select">
            <input type="checkbox" data-action="select-set" ${selected ? 'checked' : ''} />
            ${comparisonRole ? `<span class="set-role">${comparisonRole}</span>` : ''}
            <span>${escapeHtml(set.name)}</span>
          </label>
          <div class="set-card-actions">
            <button class="set-restore" type="button" data-action="restore-set" title="Restore traces from ${escapeHtml(set.name)}">
              ${iconMarkup('refresh', 'icon icon-button')}<span>Restore</span>
            </button>
            <button class="set-remove" type="button" data-action="remove-set" title="Delete set" aria-label="Delete ${escapeHtml(set.name)}">
              ${iconMarkup('close', 'icon icon-button')}
            </button>
          </div>
        </div>
        <div class="set-meta">
          <span>${set.traces.length} sample${set.traces.length === 1 ? '' : 's'}${createdAt ? ` · ${createdAt}` : ''}</span>
          <span class="set-median">${fmtMs(medianElapsed)}</span>
        </div>
      </article>`;
    }).join('');
    renderComparison();
  }

  function saveCurrentSet() {
    if (!currentTraces.length) return;
    const input = $('setNameInput');
    const name = input.value.trim() || nextSetName(measurementSets.length);
    const id = globalThis.crypto?.randomUUID?.() || `set-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const newSet = {
      id,
      name,
      createdAt: Date.now(),
      traces: JSON.parse(JSON.stringify(currentTraces)),
    };
    const nextSets = [...measurementSets, newSet];
    if (!persistMeasurementSets(measurementStorage, nextSets)) {
      $('parseInfo').textContent = 'Could not save the set: browser storage is unavailable or full.';
      return;
    }

    measurementSets = nextSets;
    selectedSetIds = selectSetForComparison(selectedSetIds, id);
    input.value = '';
    renderMeasurementSets();
    $('parseInfo').textContent = `Saved ${name} with ${currentTraces.length} trace(s).`;
  }

  function restoreMeasurementSet(setId) {
    const set = measurementSets.find((candidate) => candidate.id === setId);
    if (!set) return;

    loadTraceValuesIntoInputs(serializeSetTracesForInputs(set));
    focusAnalyzeButton(`Restored ${set.name}: ${set.traces.length} trace(s). Click Analyze to inspect it.`);
  }

  function handleSetCardsChange(event) {
    if (!event.target.matches('[data-action="select-set"]')) return;
    const setId = event.target.closest('[data-set-id]')?.dataset.setId;
    if (!setId) return;
    selectedSetIds = event.target.checked
      ? selectSetForComparison(selectedSetIds, setId)
      : selectedSetIds.filter((id) => id !== setId);
    renderMeasurementSets();
  }

  function handleSetCardsClick(event) {
    const restoreButton = event.target.closest('[data-action="restore-set"]');
    if (restoreButton) {
      const setId = restoreButton.closest('[data-set-id]')?.dataset.setId;
      if (setId) restoreMeasurementSet(setId);
      return;
    }
    const removeButton = event.target.closest('[data-action="remove-set"]');
    if (!removeButton) return;
    const setId = removeButton.closest('[data-set-id]')?.dataset.setId;
    if (!setId) return;
    const nextSets = measurementSets.filter((set) => set.id !== setId);
    if (!persistMeasurementSets(measurementStorage, nextSets)) return;
    measurementSets = nextSets;
    selectedSetIds = selectedSetIds.filter((id) => id !== setId);
    renderMeasurementSets();
    setSetsStatus('Set deleted.');
  }

  function renderResults(rows) {
    $('resultsSection').classList.add('visible');

    const newCount = rows.filter((row) => row._format === 'new').length;
    const oldCount = rows.length - newCount;
    $('sampleBadge').textContent = `n = ${rows.length}`;

    const formatBadge = $('formatBadge');
    formatBadge.style.display = 'inline';
    formatBadge.textContent = newCount > 0 && oldCount > 0
      ? `${newCount} snapshot · ${oldCount} legacy`
      : newCount > 0
        ? 'snapshot layout'
        : 'legacy layout';

    const elapsed = computeStats(rows, 'elapsedMs');
    const rpc = computeStats(rows, 'rpcDuration');
    const coldView = computeStats(rows, 'coldViewAt');
    const paintWait = computeStats(rows, 'paintWaitDur');
    const outsideHandler = rows.some((row) => row._hasBackend) ? computeStats(rows, null, 'outsideHandlerMs') : null;
    const pills = [
      { label: 'Median elapsed', val: fmtMs(elapsed?.med), sub: `p90 = ${fmtMs(elapsed?.p90)}`, cls: colorClass(elapsed?.med || 0, 1500) },
      { label: 'Median RPC', val: fmtMs(rpc?.med), sub: `p90 = ${fmtMs(rpc?.p90)}`, cls: 'bad' },
      { label: 'View ready at', val: fmtMs(coldView?.med), sub: `p90 = ${fmtMs(coldView?.p90)}`, cls: 'medium' },
      { label: 'Paint wait', val: fmtMs(paintWait?.med), sub: `p90 = ${fmtMs(paintWait?.p90)}`, cls: 'medium' },
      outsideHandler ? { label: 'Outside RTT', val: fmtMs(outsideHandler.med), sub: `p90 = ${fmtMs(outsideHandler.p90)}`, cls: 'bad' } : null,
      { label: 'Samples', val: rows.length, sub: `${newCount} snapshot · ${oldCount} legacy`, cls: '' },
    ].filter(Boolean);

    $('summaryPills').innerHTML = pills.map((pill) => `
      <div class="pill">
        <div class="pill-label">${pill.label}</div>
        <div class="pill-val ${pill.cls}">${pill.val}</div>
        <div class="pill-sub">${pill.sub}</div>
      </div>`).join('');

    const globalMax = Math.max(
      ...GROUPS.flatMap((group) => group.metrics.map((metric) => computeStats(rows, metric.key)?.max ?? NaN)).filter((value) => !isNaN(value)),
      1,
    );

    let tableBody = '';
    GROUPS.forEach((group) => {
      const hasAny = group.metrics.some((metric) => {
        const stats = computeStats(rows, metric.key);
        return stats && stats.n > 0;
      });
      if (!hasAny) return;

      tableBody += `<tr class="group-row"><td colspan="7">${iconLabelMarkup(group.icon, group.label)}</td></tr>`;
      group.metrics.forEach((metric) => {
        const stats = computeStats(rows, metric.key);
        if (!stats || stats.n === 0) {
          tableBody += `<tr><td class="td-stage">${metric.label}</td><td style="color:var(--muted);font-size:12px">${metric.desc}</td><td colspan="5" style="color:var(--muted);font-size:12px">no data</td></tr>`;
          return;
        }
        const barMedian = ((stats.med / globalMax) * 100).toFixed(1);
        const barP90 = ((stats.p90 / globalMax) * 100).toFixed(1);
        tableBody += `<tr>
          <td class="td-stage">${metric.label}</td>
          <td style="color:var(--muted);font-size:12px">${metric.desc}</td>
          <td class="td-num">${fmt(stats.med)}</td>
          <td class="td-num medium">${fmt(stats.p90)}</td>
          <td class="td-num" style="color:var(--muted)">${fmt(stats.min)}</td>
          <td class="td-num" style="color:var(--muted)">${fmt(stats.max)}</td>
          <td style="min-width:140px">
            <div style="display:flex;flex-direction:column;gap:3px">
              <div class="bar-wrap"><div class="bar-bg"><div class="bar-fill bar-med" style="width:${barMedian}%"></div></div><span style="font-size:10px;color:var(--muted);min-width:32px">${fmt(stats.med)}</span></div>
              <div class="bar-wrap"><div class="bar-bg"><div class="bar-fill bar-p90" style="width:${barP90}%"></div></div><span style="font-size:10px;color:var(--medium);min-width:32px">${fmt(stats.p90)}</span></div>
            </div>
          </td>
        </tr>`;
      });
    });
    $('statsBody').innerHTML = tableBody;

    const backendSection = $('backendBreakdown');
    if (rows.some((row) => row._hasBackend)) {
      backendSection.style.display = 'block';
      const backendRows = rows.filter((row) => row._hasBackend);
      $('backendContext').innerHTML = buildBackendContextLabels(backendRows)
        .map((label) => `<span class="backend-context-chip">${escapeHtml(label)}</span>`)
        .join('');
      $('backendGrid').innerHTML = buildBackendGroups(rows).map((group) => `
        <section class="backend-group backend-group-${group.id}">
          <div class="backend-group-head">
            <div>
              <h4>${escapeHtml(group.label)}</h4>
              <p>${escapeHtml(group.description)}</p>
            </div>
            <span class="backend-group-count">${group.metrics.length} metric${group.metrics.length === 1 ? '' : 's'}</span>
          </div>
          <div class="backend-grid">
            ${group.metrics.map((metric) => {
              const rangeStart = Math.min(metric.summary.p50Position, metric.summary.p90Position);
              const rangeWidth = Math.abs(metric.summary.p90Position - metric.summary.p50Position);
              const impact = metric.presentation.impact;
              const variationClass = impact ? `tail-impact-${impact.key}` : 'tail-spread';
              const impactBadge = impact
                ? `<span class="tail-impact-label">${impact.label}</span>`
                : '';
              const impactCardClass = impact ? ` backend-card-impact-${impact.key}` : '';
              const kindBadge = metric.kind === 'timing'
                ? ''
                : `<span class="bc-kind bc-kind-${metric.kind}">${metric.kind}</span>`;
              const traceField = escapeHtml(metric.details.traceKey);
              const coverageBadge = `<span class="tail-badge tail-badge-neutral">coverage ${metric.coverage.sampled}/${metric.coverage.total}</span>`;
              const coverageFlag = metric.coverage.status === 'partial'
                ? '<span class="tail-badge tail-badge-warn">partial</span>'
                : '';
              const confidenceBadgeClass = describeSampleConfidence(metric.coverage.sampled).badgeClass;
              const detailTitle = escapeHtml(`${metric.details.traceKey}: p95 ${metric.presentation.p95}; max ${metric.presentation.max}; relative tail ${metric.presentation.relative}; coverage ${metric.coverage.sampled}/${metric.coverage.total} (${metric.coverage.status})`);
              const rangeImpactClass = impact ? ` percentile-range-impact-${impact.key}` : '';
              return `<article class="backend-card backend-card-${metric.kind}${impactCardClass}" title="${detailTitle}">
                <div class="bc-heading">
                  <div class="bc-label">${escapeHtml(metric.label)}</div>
                  ${kindBadge}
                </div>
                <div class="bc-sub">${escapeHtml(metric.desc)}</div>
                <div class="bc-vals">
                  <div class="percentile-stat p50">
                    <span class="percentile-stat-label">p50</span>
                    <span class="percentile-stat-reading">${metricReadingMarkup(metric.presentation.p50)}</span>
                  </div>
                  <div class="percentile-stat p90">
                    <span class="percentile-stat-label">p90</span>
                    <span class="percentile-stat-reading">${metricReadingMarkup(metric.presentation.p90)}</span>
                  </div>
                </div>
                <div class="bc-tail">
                  <span class="tail-value ${variationClass}"><span class="tail-value-main">${metric.variationLabel} ${escapeHtml(metric.presentation.delta)}</span>${impactBadge}</span>
                  <span class="tail-confidence">
                    ${coverageBadge}
                    ${coverageFlag}
                    <span class="tail-badge ${confidenceBadgeClass}">${metric.summary.confidence}</span>
                  </span>
                </div>
                <div class="percentile-track" title="${traceField}: p50 ${escapeHtml(metric.presentation.p50)}; p90 ${escapeHtml(metric.presentation.p90)}">
                  <div class="percentile-range percentile-range-${group.distribution}${rangeImpactClass}" style="left:${rangeStart.toFixed(1)}%;width:${rangeWidth.toFixed(1)}%"></div>
                  <span class="percentile-marker p50" style="left:${metric.summary.p50Position.toFixed(1)}%"></span>
                  <span class="percentile-marker p90" style="left:${metric.summary.p90Position.toFixed(1)}%"></span>
                </div>
                <details class="bc-details">
                  <summary>p95 · max · relative · field</summary>
                  <div class="bc-details-content">
                    <div class="bc-details-stats">
                      <span><small>p95</small>${escapeHtml(metric.presentation.p95)}</span>
                      <span><small>max</small>${escapeHtml(metric.presentation.max)}</span>
                      <span><small>relative</small>${escapeHtml(metric.presentation.relative)}</span>
                    </div>
                    <code>${traceField}</code>
                  </div>
                </details>
              </article>`;
            }).join('')}
          </div>
        </section>
      `).join('');
    } else {
      backendSection.style.display = 'none';
      $('backendContext').innerHTML = '';
    }

    lastTextReport = buildTextReport(rows);
    $('textReportOutput').textContent = lastTextReport;

    const sampleDistributions = Object.fromEntries(SAMPLE_METRICS.map((metric) => [
      metric.key,
      rows
        .filter((row) => !metric.visible || metric.visible(row))
        .map(metric.read)
        .filter((value) => Number.isFinite(value)),
    ]));
    $('sampleCards').innerHTML = rows.map((row, index) => {
      const formatLabel = row._format === 'new' ? 'new' : 'old';
      const visibleMetrics = SAMPLE_METRICS.filter((metric) => !metric.visible || metric.visible(row));
      const renderedMetrics = visibleMetrics.map((metric) => ({
        metric,
        ...renderRelativeMetric(metric, row, sampleDistributions),
      }));
      const cardStatus = renderedMetrics.reduce(
        (worst, current) => SAMPLE_STATUS_PRIORITY[current.comparison.key] > SAMPLE_STATUS_PRIORITY[worst]
          ? current.comparison.key
          : worst,
        'typical',
      );
      const elapsedMetric = renderedMetrics.find(({ metric }) => metric.primary);
      const detailMetrics = renderedMetrics.filter(({ metric }) => !metric.primary);
      return `<div class="sample-card sc-card-${cardStatus}">
        <div class="sc-head">
          <span>Sample ${index + 1}</span>
          <div style="display:flex;gap:6px;align-items:center">
            <span style="font-size:10px;color:var(--muted)">${row.messageCount ?? '?'} msg</span>
            <span class="sc-format ${formatLabel}">${formatLabel}</span>
          </div>
        </div>
        <div class="sc-elapsed sc-relative-${elapsedMetric.comparison.key}" title="${escapeHtml(relativeMetricTitle(elapsedMetric.metric, elapsedMetric.comparison))}">${fmt(row.elapsedMs)} ms</div>
        <div class="sc-detail">
          ${detailMetrics.map(({ metric, markup }) => `<div class="sc-metric-row"><span>${metric.label}</span>${markup}</div>`).join('')}
        </div>
      </div>`;
    }).join('');
  }

  function renderErrors(errors) {
    const errorList = $('errorList');
    errorList.innerHTML = '';
    errors.forEach((error) => {
      const item = document.createElement('li');
      item.textContent = error;
      errorList.appendChild(item);
    });
  }

  function parseAll() {
    const textareas = document.querySelectorAll('#tracesWrapper textarea');
    const errors = [];
    const traces = [];

    textareas.forEach((textarea, index) => {
      textarea.classList.remove('error');
      const raw = textarea.value.trim();
      if (!raw) return;
      try {
        traces.push(normalizeTrace(JSON.parse(raw)));
      } catch (error) {
        textarea.classList.add('error');
        errors.push(`Trace ${index + 1}: ${error.message}`);
      }
    });

    renderErrors(errors);
    if (!traces.length) {
      currentTraces = [];
      setSaveAvailability(false);
      $('parseInfo').textContent = 'No valid traces found.';
      return;
    }

    currentTraces = traces;
    setSaveAvailability(true);
    $('parseInfo').textContent = `Parsed ${traces.length} trace(s).`;
    renderResults(traces.map(extract));
  }

  function ensureTrailingEmptyTrace() {
    const textareas = [...document.querySelectorAll('#tracesWrapper textarea')];
    if (!textareas.length || textareas.at(-1).value.trim()) addTrace();
  }

  function handleTraceInput(event) {
    if (!event.target.matches('textarea')) return;
    invalidateCurrentAnalysis();
    const textareas = [...document.querySelectorAll('#tracesWrapper textarea')];
    const values = textareas.map((textarea) => textarea.value);
    if (shouldAppendTrailingTrace(values, textareas.indexOf(event.target))) addTrace();
  }

  function createRemoveButton(row) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-remove';
    button.title = 'Remove';
    button.setAttribute('aria-label', 'Remove trace');
    button.innerHTML = iconMarkup('close', 'icon icon-button');
    button.addEventListener('click', () => {
      row.remove();
      invalidateCurrentAnalysis();
      ensureTrailingEmptyTrace();
    });
    return button;
  }

  function addTrace(value = '') {
    traceCount += 1;
    const row = document.createElement('div');
    row.className = 'trace-row';
    row.id = `row-trace-${traceCount}`;

    const label = document.createElement('span');
    label.className = 'trace-label';
    label.textContent = `#${traceCount}`;

    const textarea = document.createElement('textarea');
    textarea.id = `trace-${traceCount}`;
    textarea.placeholder = '{ "elapsedMs": ..., "stages": [...] }';
    textarea.value = value;

    row.append(label, textarea, createRemoveButton(row));
    $('tracesWrapper').appendChild(row);
  }

  function resetResults() {
    $('parseInfo').textContent = '';
    $('errorList').innerHTML = '';
    $('textReportOutput').textContent = '';
    $('copyReportButton').textContent = 'Copy report';
    $('copyReportButton').removeAttribute('aria-label');
    lastTextReport = '';
    $('resultsSection').classList.remove('visible');
  }

  function clearAll() {
    $('tracesWrapper').innerHTML = '';
    traceCount = 0;
    currentTraces = [];
    setSaveAvailability(false);
    resetResults();
    addTrace();
  }

  function loadComparisonExample() {
    const traces = Array.isArray(globalThis.HERMES_PERF_EXAMPLE_TRACES)
      ? globalThis.HERMES_PERF_EXAMPLE_TRACES
      : [];
    if (!traces.length) {
      $('parseInfo').textContent = 'Example set is unavailable.';
      return;
    }
    loadTraceValuesIntoInputs(traces.map((trace) => JSON.stringify(trace, null, 2)));
    focusAnalyzeButton(`Loaded ${traces.length} example traces. Click Analyze to inspect the sample set.`);
  }

  function deltaClass(delta) {
    if (!Number.isFinite(delta) || Math.abs(delta) < 0.05) return 'delta-neutral';
    return delta < 0 ? 'delta-good' : 'delta-bad';
  }

  function init() {
    try {
      measurementStorage = window.localStorage;
    } catch (_) {
      measurementStorage = null;
    }
    measurementSets = loadMeasurementSets(measurementStorage);
    selectedSetIds = measurementSets.slice(-2).map((set) => set.id);
    $('analyzeButton').addEventListener('click', parseAll);
    $('addTraceButton').addEventListener('click', () => addTrace());
    $('loadExampleButton').addEventListener('click', loadComparisonExample);
    $('clearAllButton').addEventListener('click', clearAll);
    $('saveSetButton').addEventListener('click', saveCurrentSet);
    $('exportSetsButton').addEventListener('click', exportMeasurementSets);
    $('importSetsButton').addEventListener('click', () => $('importSetsInput').click());
    $('importSetsInput').addEventListener('change', importMeasurementSets);
    $('setNameInput').addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !$('saveSetButton').disabled) saveCurrentSet();
    });
    $('setCards').addEventListener('change', handleSetCardsChange);
    $('setCards').addEventListener('click', handleSetCardsClick);
    $('tracesWrapper').addEventListener('input', handleTraceInput);
    $('copyReportButton').addEventListener('click', copyTextReport);
    $('copyComparisonButton').addEventListener('click', copyComparisonReport);
    $('downloadReportButton').addEventListener('click', downloadTextReport);
    clearAll();
    renderMeasurementSets();
  }

  const appModule = { init };
  Object.assign(HermesPerfAnalyzer, appModule);

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = appModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

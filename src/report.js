(function attachReportModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});
  const stats = typeof module !== 'undefined' && module.exports
    ? require('./stats.js')
    : HermesPerfAnalyzer;
  const {
    buildMetricPresentation,
    computeStats,
    fmt,
    formatSigned,
    summarizePercentiles,
  } = stats;

  const TEXT_REPORT_SECTION_KEYS = ['summary', 'renderer', 'raf', 'backend', 'samples'];
  const DEFAULT_TEXT_REPORT_SECTIONS = Object.freeze(
    Object.fromEntries(TEXT_REPORT_SECTION_KEYS.map((key) => [key, true])),
  );

  const RENDERER_METRICS = [
    { key: 'coldViewToRuntimeRenderMs', label: 'Cold publish → runtime render', desc: 'React scheduling before the runtime boundary starts rendering' },
    { key: 'runtimeRenderToLayoutMs', label: 'Runtime render → layout commit', desc: 'Runtime boundary render, descendants, and DOM commit' },
    { key: 'runtimeLayoutToAdapterSyncMs', label: 'Runtime layout → adapter sync', desc: 'Wait from layout commit until the passive adapter effect starts' },
    { key: 'runtimeAdapterOperationMs', label: 'Runtime adapter operation', desc: 'Adapter repository update and synchronous subscriber notification' },
    { key: 'adapterSyncToThreadRenderMs', label: 'Adapter sync start → thread render', desc: 'Delay from pre-notification sync boundary to the committed Thread render' },
    { key: 'adapterSyncToThreadLayoutMs', label: 'Adapter synced → selected Thread layout', desc: 'Wall-clock span from adapter completion to the selected post-adapter Thread layout' },
    { key: 'threadRenderBodyMs', label: 'Thread list render body', desc: 'Synchronous work owned by the ThreadMessageList function' },
    { key: 'threadAfterBodyToInsertionMs', label: 'Thread descendants → insertion', desc: 'Descendant reconciliation and scheduler time after the list function returns' },
    { key: 'threadInsertionToLayoutMs', label: 'Thread insertion → layout', desc: 'Commit-phase work between insertion and layout effects' },
    { key: 'threadRenderToLayoutMs', label: 'Thread render → layout commit', desc: 'Visible thread subtree render and DOM commit' },
    { key: 'userMessageRenderBodyMs', label: 'User message render body', desc: 'Synchronous work owned by the visible UserMessage function' },
    { key: 'assistantMessageRenderBodyMs', label: 'Matched Assistant shell render body', desc: 'AssistantMessage owning the selected dominant Markdown message' },
    { key: 'assistantMessageAfterBodyToInsertionMs', label: 'Matched Assistant descendants → insertion', desc: 'Matched assistant shell reconciliation and scheduling after its function returns' },
    { key: 'assistantMessageInsertionToLayoutMs', label: 'Matched Assistant insertion → layout', desc: 'Matched assistant shell commit work before its layout effect' },
    { key: 'assistantMessageRenderToLayoutMs', label: 'Matched Assistant render → layout', desc: 'Matched assistant shell render and commit span; it may be a different commit from deferred Markdown' },
    { key: 'assistantLayoutToMarkdownLayoutMs', label: 'Assistant layout → later Markdown layout', desc: 'Deferred gap when the selected Markdown commits after its matched Assistant shell' },
    { key: 'adapterSyncToMarkdownLayoutMs', label: 'Adapter synced → dominant Markdown layout', desc: 'Wall-clock span from adapter completion to the selected slowest Markdown layout' },
    { key: 'threadLayoutToMarkdownLayoutMs', label: 'Thread layout → later Markdown layout', desc: 'Deferred gap when dominant Markdown commits after the selected Thread shell' },
    { key: 'assistantMarkdownRenderBodyMs', label: 'Dominant Markdown render body', desc: 'Synchronous setup owned by the selected slowest MarkdownTextSurface' },
    { key: 'assistantMarkdownAfterBodyToInsertionMs', label: 'Dominant Markdown descendants → insertion', desc: 'Selected Streamdown reconciliation and scheduling after MarkdownTextSurface returns' },
    { key: 'assistantMarkdownInsertionToLayoutMs', label: 'Dominant Markdown insertion → layout', desc: 'Selected Markdown subtree DOM commit work before its layout effect' },
    { key: 'assistantMarkdownRenderToLayoutMs', label: 'Dominant Markdown render → layout', desc: 'Selected slowest Markdown part render and commit span' },
  ];

  const FRAME_METRICS = [
    { key: 'paintWaitDur', label: 'Paint-wait start → selected Thread layout', desc: 'Time to the selected post-adapter Thread layout, not a browser paint measurement' },
    { key: 'markdownLayoutToRaf1Ms', label: 'Dominant Markdown layout → RAF1', desc: 'Scheduler/frame gap after the selected Markdown layout' },
    { key: 'raf1ToRaf2Ms', label: 'RAF1 → RAF2', desc: 'Gap between the two requestAnimationFrame callbacks' },
    { key: 'raf2WaitMs', label: 'Double-RAF completion wait', desc: 'Total wait through RAF2; this is not a direct pixel-paint timestamp' },
    { key: 'resumeRespAt', label: 'Response sent at', desc: 'Absolute trace time of the backend response-sent marker' },
    { key: 'raf1At', label: 'RAF1 at', desc: 'Absolute trace time of the first requestAnimationFrame callback' },
    { key: 'raf2At', label: 'RAF2 at', desc: 'Absolute trace time of the second requestAnimationFrame callback' },
  ];

  const GROUPS = [
    {
      icon: 'timer',
      label: 'Top-level',
      metrics: [
        { key: 'elapsedMs', label: 'elapsedMs', desc: 'Total time through the second requestAnimationFrame marker' },
      ],
    },
    {
      icon: 'search',
      label: 'Profile & RPC window',
      metrics: [
        { key: 'profileAt', label: 'profile-resolve-finished · atMs', desc: 'Profile ready — RPC can start' },
        { key: 'rpcStartAt', label: 'resume-rpc-start · atMs', desc: 'When RPC was fired' },
        { key: 'rpcDuration', label: 'resume-rpc · sincePrevious', desc: 'End-to-end RPC call (sincePreviousStageMs)' },
        { key: 'rpcDurationMs', label: 'resume-rpc · rpcDurationMs', desc: 'Explicit rpc duration field (new format)' },
        { key: 'rpcFinishedAt', label: 'resume-rpc-finished · atMs', desc: 'Absolute time when RPC finished' },
      ],
    },
    {
      icon: 'stack',
      label: 'Cache stages (new format — before RPC)',
      metrics: [
        { key: 'preRepoBuiltAt', label: 'repo-built [pre-RPC] · atMs', desc: 'Warm cache repo built from local DB' },
        { key: 'preAdapterAt', label: 'adapter-synced [pre-RPC] · atMs', desc: 'Warm cache adapter sync' },
      ],
    },
    {
      icon: 'refresh',
      label: 'Post-RPC reconciliation',
      metrics: [
        { key: 'postRepoBuiltAt', label: 'repo-built [post-RPC] · atMs', desc: 'Repo rebuilt after RPC response' },
        { key: 'postAdapterAt', label: 'adapter-synced [post-RPC] · atMs', desc: 'Adapter re-synced after RPC' },
        { key: 'transcriptMs', label: 'transcript-transformed · Δ', desc: 'toRuntimeMessage pass (new: <1ms delta)' },
        { key: 'coldViewAt', label: 'cold-view-published · atMs', desc: 'View ready for paint scheduling' },
      ],
    },
    {
      icon: 'brush',
      label: 'Renderer scheduling',
      metrics: RENDERER_METRICS,
    },
    {
      icon: 'brush',
      label: 'Frame / RAF scheduling',
      metrics: FRAME_METRICS,
    },
  ];

  const BACKEND_GROUPS = [
    {
      id: 'critical',
      label: 'Critical breakdown',
      description: 'Top-level request timings. Derived rows are calculated rather than directly timed spans.',
      distribution: 'latency',
      fields: [
        { key: 'handlerMs', traceKey: 'backendHandlerMs', label: 'Backend handler', desc: 'Pure handler execution time' },
        { key: 'outsideHandlerMs', traceKey: 'outsideHandlerRoundTripMs', label: 'Outside handler RTT', desc: 'Full round-trip outside backend handler', kind: 'derived' },
        { key: 'unmeasuredMs', traceKey: 'unmeasuredRoundTripMs', label: 'Unmeasured RTT', desc: 'RTT not covered by instrumentation', kind: 'derived' },
      ],
    },
    {
      id: 'handler',
      label: 'Backend handler details',
      description: 'Reported work inside the handler. Rows may overlap and are not additive.',
      distribution: 'latency',
      fields: [
        { key: 'historyReadMs', traceKey: 'backendHistoryReadMs', label: 'History DB read', desc: 'Reading message history from SQLite' },
        { key: 'dbOpenMs', traceKey: 'backendDbOpenMs', label: 'DB open', desc: 'Opening the session database' },
        { key: 'sessionLookupMs', traceKey: 'backendSessionLookupMs', label: 'Session lookup', desc: 'Session lookup in DB' },
        { key: 'liveLookupMs', traceKey: 'backendLiveLookupMs', label: 'Live lookup', desc: 'Looking up the live session' },
        { key: 'liveRegisterMs', traceKey: 'backendLiveRegisterMs', label: 'Live register', desc: 'Registering the resumed live session' },
        { key: 'reopenMs', traceKey: 'backendReopenMs', label: 'Session reopen', desc: 'Reopening the persisted session' },
        { key: 'tipResolveMs', traceKey: 'backendTipResolveMs', label: 'Tip resolve', desc: 'Resolving the session tip' },
        { key: 'slotClaimMs', traceKey: 'backendSlotClaimMs', label: 'Slot claim', desc: 'Live session slot claim' },
        { key: 'recordPrepareMs', traceKey: 'backendRecordPrepareMs', label: 'Record prepare', desc: 'Preparing response record' },
        { key: 'resumeInfoMs', traceKey: 'backendResumeInfoMs', label: 'Resume info', desc: 'Resume info fetch' },
        { key: 'promptSetupMs', traceKey: 'backendPromptSetupMs', label: 'Prompt setup', desc: 'Setting up prompt' },
      ],
    },
    {
      id: 'server',
      label: 'Queues & server transport',
      description: 'Backend queueing, serialization, and WebSocket delivery.',
      distribution: 'latency',
      fields: [
        { key: 'dispatchQueueMs', traceKey: 'backendDispatchQueueMs', label: 'Dispatch queue', desc: 'Backend RPC pool queue wait' },
        { key: 'eventLoopQueueMs', traceKey: 'backendEventLoopQueueMs', label: 'Response loop queue', desc: 'Transport write → event-loop send coroutine' },
        { key: 'handlerToWriteMs', traceKey: 'backendHandlerToWriteMs', label: 'Handler → write', desc: 'Handler return → transport write' },
        { key: 'messageTransportMs', traceKey: 'backendMessageTransportMs', label: 'Message transport', desc: 'Serialization + send' },
        { key: 'jsonSerializeMs', traceKey: 'backendJsonSerializeMs', label: 'JSON serialize', desc: 'Backend JSON serialize' },
        { key: 'wsReceiveToAckMs', traceKey: 'backendWsReceiveToAckMs', label: 'WS receive → ACK', desc: 'Backend work after receive_text returned' },
        { key: 'wsAckSendMs', traceKey: 'backendWsAckSendMs', label: 'WS ACK send', desc: 'ACK flush and send on backend' },
        { key: 'wsPreviousDispatchMs', traceKey: 'backendWsPreviousDispatchMs', label: 'Previous WS dispatch', desc: 'Time the previous request occupied this connection receive loop' },
        { key: 'wsPreviousRequestMs', traceKey: 'backendWsPreviousRequestMs', label: 'Previous WS request', desc: 'Total receive-loop occupancy of the previous request, including response send' },
        { key: 'wsEventLoopLagMs', traceKey: 'backendWsEventLoopLagMs', label: 'Backend event-loop lag', desc: 'Maximum backend loop timer drift before resume receive' },
        { key: 'responseSendMs', traceKey: 'backendResponseSendMs', label: 'Response send', desc: 'Backend response send_text duration' },
        { key: 'responseSendTotalMs', traceKey: 'backendSendTotalMs', label: 'Response send total', desc: 'Buffered prefix plus response send' },
      ],
    },
    {
      id: 'client',
      label: 'Client transport & parsing',
      description: 'Renderer acknowledgement, response delivery, queueing, and parsing.',
      distribution: 'latency',
      fields: [
        { key: 'clientReqAckMs', traceKey: 'clientRequestReceiveAckMs', label: 'Client → ACK', desc: 'Time until client received RPC ack' },
        { key: 'clientReqAckTransportMs', traceKey: 'clientRequestReceiveAckTransportMs', label: 'Client → ACK excl. queue', desc: 'Composite send, backend pre-ACK, and IPC wait; not pure wire transport' },
        { key: 'clientReqAckRendererLagMs', traceKey: 'clientRequestReceiveAckRendererLagMs', label: 'Renderer lag during ACK wait', desc: 'Maximum renderer timer drift while waiting for ACK' },
        { key: 'clientReqAckUnattributedMs', traceKey: 'clientRequestReceiveAckUnattributedMs', label: 'ACK wait residual', desc: 'Residual after sampled renderer and queue lag; the 50 ms renderer probe cannot decompose shorter waits precisely' },
        { key: 'clientAckEventQueueMs', traceKey: 'clientReceiveAckEventQueueMs', label: 'ACK event queue', desc: 'Renderer queue before ACK callback' },
        { key: 'clientAckToRespMs', traceKey: 'clientReceiveAckToResponseMs', label: 'ACK → response', desc: 'Time from ACK to full response received' },
        { key: 'clientMessageQueueMs', traceKey: 'clientMessageEventQueueMs', label: 'Response event queue', desc: 'Renderer queue before response callback' },
        { key: 'clientJsonParseMs', traceKey: 'clientJsonParseMs', label: 'Client JSON parse', desc: 'Client-side parse time' },
      ],
    },
    {
      id: 'state',
      label: 'Backend state at response',
      description: 'State snapshots captured around the response, not time spent by this RPC.',
      distribution: 'spread',
      fields: [
        { key: 'agentBuildActiveCount', traceKey: 'backendAgentBuildActiveCount', label: 'Agent builds active', desc: 'Active builds when backend received request', unit: 'count', kind: 'snapshot' },
        { key: 'agentBuildActiveMaxMs', traceKey: 'backendAgentBuildActiveMaxElapsedMs', label: 'Active build elapsed', desc: 'Longest active build elapsed at ACK', kind: 'snapshot' },
        { key: 'agentBuildLastDurMs', traceKey: 'backendAgentBuildLastDurationMs', label: 'Agent build (last)', desc: 'Last agent init duration', kind: 'snapshot' },
        { key: 'agentBuildLastAgoMs', traceKey: 'backendAgentBuildLastFinishedAgoMs', label: 'Agent build (ago)', desc: 'How long ago agent was last built', kind: 'snapshot' },
      ],
    },
    {
      id: 'context',
      label: 'Response context',
      description: 'Payload characteristics that help explain timings but are not latency.',
      distribution: 'spread',
      fields: [
        { key: 'wsPreviousRequestFinishedAgoMs', traceKey: 'backendWsPreviousRequestFinishedAgoMs', label: 'Previous request idle age', desc: 'Idle context before resume arrived, not latency caused by resume', kind: 'context' },
        { key: 'clientRespChars', traceKey: 'clientResponseChars', label: 'Response size', desc: 'Serialized response length', unit: 'chars', kind: 'context' },
      ],
    },
  ];

  const BACKEND_FIELDS = BACKEND_GROUPS.flatMap((group) => group.fields);

  const COMPARISON_METRICS = [
    { label: 'Total elapsed', key: 'elapsedMs' },
    { label: 'Profile ready at', key: 'profileAt' },
    { label: 'Resume RPC', key: 'rpcDurationMs' },
    { label: 'Cold view published at', key: 'coldViewAt' },
    { label: 'Cold publish → runtime render', key: 'coldViewToRuntimeRenderMs' },
    { label: 'Runtime render → layout', key: 'runtimeRenderToLayoutMs' },
    { label: 'Runtime layout → adapter sync', key: 'runtimeLayoutToAdapterSyncMs' },
    { label: 'Adapter sync → thread render', key: 'adapterSyncToThreadRenderMs' },
    { label: 'Thread render → layout', key: 'threadRenderToLayoutMs' },
    { label: 'Double-RAF completion wait', key: 'raf2WaitMs' },
    { label: 'Backend handler', subKey: 'handlerMs' },
    { label: 'DB open', subKey: 'dbOpenMs' },
    { label: 'Live lookup', subKey: 'liveLookupMs' },
    { label: 'Live register', subKey: 'liveRegisterMs' },
    { label: 'Session reopen', subKey: 'reopenMs' },
    { label: 'Tip resolve', subKey: 'tipResolveMs' },
    { label: 'Outside handler RTT', subKey: 'outsideHandlerMs' },
  ];

  function buildBackendGroups(rows) {
    const backendRows = rows.filter((row) => row?._hasBackend && row.backend);
    return BACKEND_GROUPS.map((group) => {
      const metrics = group.fields.map((field) => {
        const stats = computeStats(backendRows, null, field.key);
        if (!stats || stats.n === 0) return null;
        const unit = field.unit || 'ms';
        const summary = summarizePercentiles(stats.med, stats.p90, stats.n);
        return {
          ...field,
          kind: field.kind || 'timing',
          unit,
          variationLabel: group.distribution === 'spread' ? 'spread' : 'tail',
          coverage: {
            sampled: stats.n,
            total: rows.length,
            status: stats.n === rows.length ? 'complete' : 'partial',
          },
          details: {
            p95: stats.p95,
            max: stats.max,
            traceKey: field.traceKey || field.key,
          },
          presentation: buildMetricPresentation({
            stats,
            summary,
            unit,
            distribution: group.distribution,
          }),
          stats,
          summary,
        };
      }).filter(Boolean);

      return {
        id: group.id,
        label: group.label,
        description: group.description,
        distribution: group.distribution,
        metrics,
      };
    }).filter((group) => group.metrics.length > 0);
  }

  function formatBackendContext(backend) {
    const parts = [
      Number.isFinite(backend.timingVersion) ? `timing v${fmt(backend.timingVersion, 0)}` : 'legacy timing',
    ];
    if (typeof backend.resumePrewarmMode === 'string' && backend.resumePrewarmMode.trim()) {
      parts.push(`prewarm ${backend.resumePrewarmMode.trim().replaceAll('_', '-')}`);
    } else if (backend.resumePrewarmEnabled === true || backend.resumePrewarmEnabled === 1) {
      parts.push('prewarm immediate');
    } else if (backend.resumePrewarmEnabled === false || backend.resumePrewarmEnabled === 0) {
      parts.push('prewarm disabled');
    }
    return parts.join(' · ');
  }

  function formatPrewarmMode(backend) {
    if (typeof backend.resumePrewarmMode === 'string' && backend.resumePrewarmMode.trim()) {
      return backend.resumePrewarmMode.trim().replaceAll('_', '-');
    }
    if (backend.resumePrewarmEnabled === true || backend.resumePrewarmEnabled === 1) return 'immediate';
    if (backend.resumePrewarmEnabled === false || backend.resumePrewarmEnabled === 0) return 'disabled';
    return 'unknown';
  }

  function buildBackendContextLabels(rows) {
    return [...new Set(rows.filter((row) => row._hasBackend).map((row) => formatBackendContext(row.backend)))];
  }

  function buildComparisonRows(rowsA, rowsB) {
    return COMPARISON_METRICS.map((metric) => {
      const statsA = computeStats(rowsA, metric.key, metric.subKey);
      const statsB = computeStats(rowsB, metric.key, metric.subKey);
      const valueA = statsA?.med ?? NaN;
      const valueB = statsB?.med ?? NaN;
      const hasPair = Number.isFinite(valueA) && Number.isFinite(valueB);
      const delta = hasPair ? valueB - valueA : NaN;
      const percent = hasPair && valueA !== 0 ? (delta / valueA) * 100 : NaN;
      return { ...metric, statsA, statsB, valueA, valueB, delta, percent };
    }).filter((row) => Number.isFinite(row.valueA) || Number.isFinite(row.valueB));
  }

  function buildComparisonSummary(comparisonRows) {
    const totalElapsed = comparisonRows.find((row) => row.key === 'elapsedMs');
    const delta = totalElapsed?.delta ?? NaN;
    const outcome = !Number.isFinite(delta)
      ? { key: 'unavailable', label: 'No comparable total' }
      : Math.abs(delta) < 0.05
        ? { key: 'neutral', label: 'No material change' }
        : delta < 0
          ? { key: 'faster', label: 'B faster' }
          : { key: 'slower', label: 'B slower' };

    return {
      valueA: totalElapsed?.valueA ?? NaN,
      valueB: totalElapsed?.valueB ?? NaN,
      delta,
      percent: totalElapsed?.percent ?? NaN,
      ...outcome,
    };
  }

  function buildComparisonTextReport(setA, setB, comparisonRows, rowsA, rowsB) {
    const oneLine = (value) => String(value).replace(/\s+/g, ' ').trim();
    const contextA = buildBackendContextLabels(rowsA).join(', ') || 'no backend timing';
    const contextB = buildBackendContextLabels(rowsB).join(', ') || 'no backend timing';
    const summary = buildComparisonSummary(comparisonRows);
    const lines = [
      'HERMES MEASUREMENT SET COMPARISON',
      `A: ${oneLine(setA.name)} | samples: ${setA.traces.length}`,
      `A backend: ${contextA}`,
      `B: ${oneLine(setB.name)} | samples: ${setB.traces.length}`,
      `B backend: ${contextB}`,
      'delta: B - A | negative means B is faster',
      `OVERALL p50 total elapsed: A ${fmt(summary.valueA)} ms | B ${fmt(summary.valueB)} ms | delta ${formatSigned(summary.delta, ' ms')} | change ${formatSigned(summary.percent, '%')} | ${summary.label}`,
    ];

    [
      ['P50 METRICS', 'med'],
      ['P90 METRICS', 'p90'],
      ['P95 METRICS', 'p95'],
    ].forEach(([heading, statKey]) => {
      lines.push('', heading);
      comparisonRows.forEach((row) => {
        const valueA = row.statsA?.[statKey] ?? NaN;
        const valueB = row.statsB?.[statKey] ?? NaN;
        const delta = Number.isFinite(valueA) && Number.isFinite(valueB) ? valueB - valueA : NaN;
        const percent = Number.isFinite(delta) && valueA !== 0 ? (delta / valueA) * 100 : NaN;
        lines.push([
          row.label.padEnd(28),
          `A ${fmt(valueA).padStart(8)} ms`,
          `B ${fmt(valueB).padStart(8)} ms`,
          `delta ${formatSigned(delta, ' ms').padStart(11)}`,
          `change ${formatSigned(percent, '%').padStart(8)}`,
        ].join(' | '));
      });
    });

    return lines.join('\n');
  }

  function reportStat(label, statsForField, unit = 'ms') {
    if (!statsForField) return null;
    const suffix = unit === 'count' ? '' : unit === 'chars' ? ' ch' : ' ms';
    return `${label.padEnd(31)} p50 ${fmt(statsForField.med).padStart(8)}${suffix}  p90 ${fmt(statsForField.p90).padStart(8)}${suffix}  p95 ${fmt(statsForField.p95).padStart(8)}${suffix}  min ${fmt(statsForField.min).padStart(8)}  max ${fmt(statsForField.max).padStart(8)}`;
  }

  function compactId(value) {
    if (typeof value !== 'string' || !value) return '-';
    return value.length > 20 ? `...${value.slice(-17)}` : value;
  }

  function buildTextReport(rows, sectionOptions = DEFAULT_TEXT_REPORT_SECTIONS) {
    const sections = { ...DEFAULT_TEXT_REPORT_SECTIONS, ...sectionOptions };
    const timingVersions = [...new Set(rows.map((row) => row.backend.timingVersion).filter(Number.isFinite))]
      .sort((a, b) => a - b)
      .map((version) => `v${version}`)
      .join(', ') || 'legacy';
    const activeBuildSamples = rows.filter((row) => row.backend.agentBuildActiveCount > 0).length;
    const backendContexts = buildBackendContextLabels(rows).join(' | ') || 'none';
    const rendererSamples = rows.filter((row) =>
      RENDERER_METRICS.some((metric) => Number.isFinite(row[metric.key])),
    ).length;
    const rendererSelectorVersions = [...new Set(rows.map((row) => row._rendererSelectionVersion).filter(Number.isFinite))];
    const rendererSelector = rendererSelectorVersions.length === 1
      ? `linked-markdown-v${rendererSelectorVersions[0]}`
      : rendererSelectorVersions.length > 1 ? 'mixed' : 'legacy';
    const lines = ['HERMES COLD-RESUME PERFORMANCE REPORT'];

    lines.push(sections.backend
      ? `samples: ${rows.length} | timing: ${timingVersions} | active-build samples: ${activeBuildSamples}/${rows.length}`
      : `samples: ${rows.length}`);

    if (sections.backend) {
      lines.push(`backend context: ${backendContexts}`);
    }

    if (sections.renderer) {
      lines.push(`analyzer: renderer-breakdown-v10 | selector: ${rendererSelector} | renderer-field samples: ${rendererSamples}/${rows.length}`);
    }

    if (sections.summary || sections.renderer || sections.raf) {
      lines.push('note: aggregate percentiles are independent distributions and are not an additive critical path');
    }

    if (sections.summary) {
      lines.push(
        '',
        'SUMMARY',
        reportStat('Total elapsed', computeStats(rows, 'elapsedMs')),
        reportStat('Resume RPC', computeStats(rows, 'rpcDurationMs')),
        reportStat('Cold view published at', computeStats(rows, 'coldViewAt')),
        reportStat('Double-RAF completion wait', computeStats(rows, 'raf2WaitMs')),
      );
    }

    const rendererLines = RENDERER_METRICS
      .map((metric) => reportStat(metric.label, computeStats(rows, metric.key)))
      .filter(Boolean);

    if (sections.renderer) {
      lines.push('', 'RENDERER SCHEDULING');
      lines.push(...(rendererLines.length > 0 ? rendererLines : ['Renderer fields unavailable in supplied traces']));
    }

    const frameLines = FRAME_METRICS
      .map((metric) => reportStat(metric.label, computeStats(rows, metric.key)))
      .filter(Boolean);

    if (sections.raf) {
      lines.push('', 'FRAME / RAF SCHEDULING');
      lines.push(...(frameLines.length > 0 ? frameLines : ['RAF fields unavailable in supplied traces']));
    }

    if (sections.backend) {
      lines.push('', 'BACKEND / TRANSPORT');

      BACKEND_FIELDS.forEach((field) => {
        const line = reportStat(field.label, computeStats(rows, null, field.key), field.unit);
        if (line) lines.push(line);
      });
    }

    if (sections.samples) {
      lines.push('', 'SAMPLES');
      rows.forEach((row, index) => {
        const backend = row.backend;
        const fields = [
          `#${String(index + 1).padStart(2, '0')}`,
          `elapsed=${fmt(row.elapsedMs)}`,
          `rpc=${fmt(row.rpcDurationMs)}`,
          `messages=${row.messageCount ?? '?'}`,
        ];

        if (sections.backend) {
          fields.push(
            `reqAck=${fmt(backend.clientReqAckMs)}`,
            `rendererLag=${fmt(backend.clientReqAckRendererLagMs)}`,
            `unattr=${fmt(backend.clientReqAckUnattributedMs)}`,
            `prev=${backend.wsPreviousMethod ?? '-'}`,
            `prevMs=${fmt(backend.wsPreviousDispatchMs)}`,
            `prevReqMs=${fmt(backend.wsPreviousRequestMs)}`,
            `loopLag=${fmt(backend.wsEventLoopLagMs)}`,
            `ackResp=${fmt(backend.clientAckToRespMs)}`,
            `handler=${fmt(backend.handlerMs)}`,
            `builds=${fmt(backend.agentBuildActiveCount, 0)}`,
            `timing=v${Number.isFinite(backend.timingVersion) ? fmt(backend.timingVersion, 0) : '?'}`,
            `prewarm=${formatPrewarmMode(backend)}`,
          );
        }

        if (sections.renderer) {
          fields.push(
            `threadAt=${fmt(row.threadSelectedAtMs)}`,
            `assistantAt=${fmt(row.assistantMessageSelectedAtMs)}`,
            `markdownAt=${fmt(row.assistantMarkdownSelectedAtMs)}`,
            `markdownMsg=${compactId(row.assistantMarkdownMessageId)}`,
            `assistantMatched=${row.assistantMessageMatchedToMarkdown ? 'yes' : 'no'}`,
            `markdownCandidates=${fmt(row.assistantMarkdownCandidateCount, 0)}`,
            `adapterMarkdown=${fmt(row.adapterSyncToMarkdownLayoutMs)}`,
          );
        }

        if (sections.raf) {
          fields.push(
            `raf2Wait=${fmt(row.raf2WaitMs)}`,
            `markdownRaf1=${fmt(row.markdownLayoutToRaf1Ms)}`,
            `raf1Raf2=${fmt(row.raf1ToRaf2Ms)}`,
          );
        }

        lines.push(fields.join(' | '));
      });
    }

    return lines.join('\n');
  }

  const reportModule = {
    DEFAULT_TEXT_REPORT_SECTIONS,
    GROUPS,
    TEXT_REPORT_SECTION_KEYS,
    buildBackendContextLabels,
    buildBackendGroups,
    buildComparisonRows,
    buildComparisonSummary,
    buildComparisonTextReport,
    buildTextReport,
  };

  Object.assign(HermesPerfAnalyzer, reportModule);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = reportModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

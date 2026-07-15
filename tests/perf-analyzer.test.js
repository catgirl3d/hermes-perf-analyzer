const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildComparisonRows,
  buildBackendGroups,
  buildMetricPresentation,
  classifyRelativeValue,
  classifyTailImpact,
  buildComparisonTextReport,
  buildTextReport,
  buildBackendContextLabels,
  describeSampleConfidence,
  createMeasurementSetsExport,
  summarizePercentiles,
  extract,
  loadMeasurementSets,
  mergeMeasurementSets,
  nextSetName,
  normalizeTrace,
  parseMeasurementSetsImport,
  persistMeasurementSets,
  selectSetForComparison,
  serializeSetTracesForInputs,
  shouldAppendTrailingTrace,
} = require('../src/index.js');
const { getMeasurementSetRemovalCopy } = require('../src/app.js');

function trace(elapsedMs, rpcDurationMs) {
  return {
    elapsedMs,
    stages: [
      { name: 'resume-rpc-start', atMs: 100 },
      {
        name: 'resume-rpc-finished',
        atMs: 100 + rpcDurationMs,
        sincePreviousStageMs: rpcDurationMs,
        rpcDurationMs,
        backendHandlerMs: rpcDurationMs - 10,
      },
      { name: 'cold-view-published', atMs: elapsedMs - 20 },
      { name: 'paint-raf-2', atMs: elapsedMs, waitDurationMs: 20 },
    ],
  };
}

test('generates spreadsheet-style default set names', () => {
  assert.equal(nextSetName(0), 'Set A');
  assert.equal(nextSetName(25), 'Set Z');
  assert.equal(nextSetName(26), 'Set AA');
  assert.equal(nextSetName(27), 'Set AB');
});

test('keeps only the two most recently selected sets', () => {
  assert.deepEqual(selectSetForComparison([], 'a'), ['a']);
  assert.deepEqual(selectSetForComparison(['a'], 'b'), ['a', 'b']);
  assert.deepEqual(selectSetForComparison(['a', 'b'], 'c'), ['b', 'c']);
  assert.deepEqual(selectSetForComparison(['a', 'b'], 'a'), ['b', 'a']);
});

test('labels custom removal confirmation with the selected set name', () => {
  assert.equal(getMeasurementSetRemovalCopy({ name: 'Set A' }), 'Delete "Set A"?');
});

test('comparison uses p50 and calculates B relative to A', () => {
  const rowsA = [trace(100, 50), trace(120, 70)].map(normalizeTrace).map(extract);
  const rowsB = [trace(80, 40), trace(100, 50)].map(normalizeTrace).map(extract);
  const comparison = buildComparisonRows(rowsA, rowsB);
  const elapsed = comparison.find((row) => row.key === 'elapsedMs');

  assert.equal(elapsed.valueA, 110);
  assert.equal(elapsed.valueB, 90);
  assert.equal(elapsed.delta, -20);
  assert.ok(Math.abs(elapsed.percent - (-18.181818)) < 0.0001);
});

test('builds an LLM-ready comparison report with deltas', () => {
  const setA = { name: 'Before', traces: [trace(100, 50), trace(120, 70)] };
  const setB = { name: 'After', traces: [trace(80, 40), trace(100, 50)] };
  const rowsA = setA.traces.map(normalizeTrace).map(extract);
  const rowsB = setB.traces.map(normalizeTrace).map(extract);
  const report = buildComparisonTextReport(setA, setB, buildComparisonRows(rowsA, rowsB), rowsA, rowsB);

  assert.match(report, /A: Before \| samples: 2/);
  assert.match(report, /B: After \| samples: 2/);
  assert.match(report, /Total elapsed/);
  assert.match(report, /delta\s+-20\.0 ms/);
  assert.match(report, /change\s+-18\.2%/);
  assert.match(report, /P90 METRICS/);
  assert.match(report, /P95 METRICS/);
});

test('normalizes a raw stages array before extraction', () => {
  const stages = trace(200, 60).stages;
  const normalized = normalizeTrace(stages);
  const row = extract(normalized);

  assert.equal(normalized.outcome, 'cold-resumed');
  assert.equal(row._rendererSelectionVersion, 3);
  assert.equal(row.elapsedMs, 200);
  assert.equal(row.rpcDurationMs, 60);
  assert.match(buildTextReport([row]), /analyzer: renderer-breakdown-v3 \| selector: post-adapter-v3/);
});

test('selects the first thread commit after the post-RPC adapter sync', () => {
  const row = extract(normalizeTrace([
    { name: 'resume-rpc-start', atMs: 50 },
    { name: 'resume-rpc-finished', atMs: 100, sincePreviousStageMs: 50 },
    { name: 'paint-wait-start', atMs: 101 },
    { name: 'runtime-boundary-layout-commit', atMs: 150, renderToLayoutCommitMs: 40 },
    {
      name: 'thread-message-list-layout-commit',
      atMs: 149,
      renderToLayoutCommitMs: 39,
      runtimeSyncToRenderStartMs: 70,
    },
    { name: 'runtime-adapter-synced', atMs: 151, layoutCommitToSyncStartMs: 0 },
    {
      name: 'thread-message-list-layout-commit',
      atMs: 190,
      renderToLayoutCommitMs: 20,
      runtimeSyncStartToRenderStartMs: 19,
    },
  ]));

  assert.equal(row.adapterSyncToThreadRenderMs, 19);
  assert.equal(row.threadRenderToLayoutMs, 20);
  assert.equal(row.paintWaitDur, 89);
});

test('extracts timing v9 and prewarm metadata from a raw stages array', () => {
  const stages = [
    { name: 'runtime-message-repository-built', atMs: 13.2 },
    { name: 'resume-rpc-start', atMs: 89.5 },
    {
      name: 'resume-rpc-finished',
      atMs: 197.8,
      sincePreviousStageMs: 108.3,
      rpcDurationMs: 107.9,
      backendHandlerMs: 18.04,
      backendLiveLookupMs: 0.02,
      backendLiveRegisterMs: 0.03,
      backendReopenMs: 0.2,
      backendTipResolveMs: 0.16,
      backendResumePrewarmEnabled: 0,
      backendResumePrewarmMode: 'post_paint',
      backendTimingVersion: 9,
    },
    { name: 'paint-raf-2', atMs: 456, waitDurationMs: 256.8 },
  ];
  const row = extract(normalizeTrace(stages));

  assert.equal(row._format, 'new');
  assert.equal(row.elapsedMs, 456);
  assert.equal(row.backend.liveLookupMs, 0.02);
  assert.equal(row.backend.liveRegisterMs, 0.03);
  assert.equal(row.backend.reopenMs, 0.2);
  assert.equal(row.backend.tipResolveMs, 0.16);
  assert.equal(row.backend.resumePrewarmEnabled, 0);
  assert.equal(row.backend.resumePrewarmMode, 'post_paint');
  assert.deepEqual(buildBackendContextLabels([row]), [
    'timing v9 · prewarm post-paint',
  ]);
});

test('labels timing v11 as on-demand agent construction', () => {
  assert.deepEqual(
    buildBackendContextLabels([
      {
        _hasBackend: true,
        backend: {
          timingVersion: 11,
          resumePrewarmEnabled: 0,
          resumePrewarmMode: 'on_demand',
        },
      },
    ]),
    ['timing v11 · prewarm on-demand'],
  );
});

test('labels timing v12 as composer-intent prewarm', () => {
  assert.deepEqual(
    buildBackendContextLabels([
      {
        _hasBackend: true,
        backend: {
          timingVersion: 12,
          resumePrewarmEnabled: 0,
          resumePrewarmMode: 'composer_intent',
        },
      },
    ]),
    ['timing v12 · prewarm composer-intent'],
  );
});

test('groups available backend metrics by diagnostic meaning', () => {
  const rows = [
    {
      _hasBackend: true,
      backend: {
        handlerMs: 10,
        outsideHandlerMs: 30,
        historyReadMs: 8,
        clientJsonParseMs: 1,
        agentBuildActiveCount: 0,
        clientRespChars: 1000,
      },
    },
    {
      _hasBackend: true,
      backend: {
        handlerMs: 30,
        outsideHandlerMs: 50,
        historyReadMs: 12,
        clientJsonParseMs: 2,
        agentBuildActiveCount: 1,
        clientRespChars: 2000,
      },
    },
  ];

  const groups = buildBackendGroups(rows);

  assert.deepEqual(groups.map((group) => group.id), [
    'critical',
    'handler',
    'client',
    'state',
    'context',
  ]);
  assert.deepEqual(
    groups.find((group) => group.id === 'critical').metrics.map((metric) => metric.key),
    ['handlerMs', 'outsideHandlerMs'],
  );

  const outsideHandler = groups
    .find((group) => group.id === 'critical')
    .metrics.find((metric) => metric.key === 'outsideHandlerMs');
  assert.equal(outsideHandler.kind, 'derived');
  assert.equal(outsideHandler.variationLabel, 'tail');
  assert.deepEqual(outsideHandler.stats, {
    med: 40,
    p90: 48,
    p95: 49,
    min: 30,
    max: 50,
    n: 2,
  });
  assert.deepEqual(outsideHandler.coverage, {
    sampled: 2,
    total: 2,
    status: 'complete',
  });
  assert.deepEqual(outsideHandler.details, {
    p95: 49,
    max: 50,
    traceKey: 'outsideHandlerRoundTripMs',
  });
  assert.deepEqual(outsideHandler.presentation, {
    p50: '40.0 ms',
    p90: '48.0 ms',
    p95: '49.0 ms',
    max: '50.0 ms',
    delta: '+8.0 ms',
    relative: '+20.0%',
    impact: {
      key: 'moderate',
      label: 'moderate',
    },
  });

  const buildCount = groups
    .find((group) => group.id === 'state')
    .metrics.find((metric) => metric.key === 'agentBuildActiveCount');
  assert.equal(buildCount.kind, 'snapshot');
  assert.equal(buildCount.variationLabel, 'spread');
  assert.equal(buildCount.unit, 'count');

  const responseSize = groups
    .find((group) => group.id === 'context')
    .metrics.find((metric) => metric.key === 'clientRespChars');
  assert.equal(responseSize.kind, 'context');
  assert.equal(responseSize.variationLabel, 'spread');
  assert.equal(responseSize.unit, 'chars');
});

test('omits backend metrics and groups without samples', () => {
  const groups = buildBackendGroups([
    {
      _hasBackend: true,
      backend: {
        handlerMs: 12,
      },
    },
    {
      _hasBackend: false,
      backend: {
        clientJsonParseMs: 99,
      },
    },
  ]);

  assert.deepEqual(groups.map((group) => group.id), ['critical']);
  assert.deepEqual(groups[0].metrics.map((metric) => metric.key), ['handlerMs']);
  assert.deepEqual(groups[0].metrics[0].coverage, {
    sampled: 1,
    total: 2,
    status: 'partial',
  });
});

test('marks metric coverage as partial when backend samples omit the field', () => {
  const groups = buildBackendGroups([
    {
      _hasBackend: true,
      backend: {
        handlerMs: 12,
      },
    },
    {
      _hasBackend: true,
      backend: {
        handlerMs: NaN,
        clientJsonParseMs: 4,
      },
    },
  ]);

  const handler = groups
    .find((group) => group.id === 'critical')
    .metrics.find((metric) => metric.key === 'handlerMs');
  assert.deepEqual(handler.coverage, {
    sampled: 1,
    total: 2,
    status: 'partial',
  });
});

test('formats sub-millisecond latency in microseconds with separate relative tail', () => {
  const stats = {
    med: 0.04,
    p90: 0.057,
    p95: 0.061,
    min: 0.03,
    max: 0.08,
    n: 20,
  };
  const presentation = buildMetricPresentation({
    stats,
    summary: summarizePercentiles(stats.med, stats.p90, stats.n),
    unit: 'ms',
    distribution: 'latency',
  });

  assert.deepEqual(presentation, {
    p50: '40 µs',
    p90: '57 µs',
    p95: '61 µs',
    max: '80 µs',
    delta: '+17 µs',
    relative: '+42.5%',
    impact: {
      key: 'micro',
      label: 'micro',
    },
  });
});

test('classifies timing impact by absolute tail rather than relative percentage', () => {
  assert.deepEqual(
    [0, 0.099, 0.1, 0.999, 1, 9.999, 10].map((value) => classifyTailImpact(value).key),
    ['micro', 'micro', 'small', 'small', 'moderate', 'moderate', 'significant'],
  );
});

test('classifies substantial per-metric differences relative to the median', () => {
  const values = [100, 105, 110, 115, 180, 300];

  assert.deepEqual(classifyRelativeValue(100, values), {
    key: 'typical',
    baseline: 112.5,
    percent: -11.11111111111111,
    sampleCount: 6,
  });
  assert.equal(classifyRelativeValue(180, values).key, 'slow');
  assert.equal(classifyRelativeValue(300, values).key, 'outlier');
  assert.equal(classifyRelativeValue(60, [...values, 60]).key, 'fast');
});

test('keeps relative comparison neutral with too few or non-finite samples', () => {
  assert.equal(classifyRelativeValue(300, [100, 300]).key, 'typical');
  assert.equal(classifyRelativeValue(NaN, [100, 110, 120]).key, 'typical');
  assert.equal(classifyRelativeValue(0, [0, 0, 10]).key, 'typical');
});

test('separates an elevated sample from a strong elapsed-time outlier', () => {
  const elapsedValues = [298.1, 585.2, 422.4, 291.5, 296.6, 525.3, 342.6, 970, 553.6, 1993.8];

  assert.equal(classifyRelativeValue(970, elapsedValues).key, 'slow');
  assert.equal(classifyRelativeValue(1993.8, elapsedValues).key, 'outlier');
});

test('adds a new field only when the edited last field has content', () => {
  assert.equal(shouldAppendTrailingTrace(['trace'], 0), true);
  assert.equal(shouldAppendTrailingTrace(['trace', ''], 0), false);
  assert.equal(shouldAppendTrailingTrace(['trace', '  '], 1), false);
  assert.equal(shouldAppendTrailingTrace(['trace', '{}'], 1), true);
});

test('persists valid measurement sets and ignores broken storage data', () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const sets = [{ id: 'a', name: 'Set A', createdAt: 1, traces: [trace(100, 50)] }];

  assert.equal(persistMeasurementSets(storage, sets), true);
  assert.deepEqual(loadMeasurementSets(storage), sets);

  values.set('hermes-perf-analyzer.measurement-sets.v1', '{broken');
  assert.deepEqual(loadMeasurementSets(storage), []);
  assert.deepEqual(loadMeasurementSets(null), []);
});

test('exports and imports a versioned measurement sets file', () => {
  const sets = [{ id: 'a', name: 'Set A', createdAt: 1, traces: [trace(100, 50)] }];
  const exported = createMeasurementSetsExport(sets, '2026-07-14T20:00:00.000Z');

  assert.deepEqual(exported, {
    format: 'hermes-perf-analyzer.measurement-sets',
    version: 1,
    exportedAt: '2026-07-14T20:00:00.000Z',
    sets,
  });
  assert.deepEqual(parseMeasurementSetsImport(JSON.stringify(exported)), sets);
  assert.deepEqual(parseMeasurementSetsImport(JSON.stringify(sets)), sets);
  assert.throws(() => parseMeasurementSetsImport('{"format":"unknown"}'), /Unsupported/);
});

test('merges imported sets without duplicating existing ids', () => {
  const setA = { id: 'a', name: 'Set A', traces: [trace(100, 50)] };
  const setB = { id: 'b', name: 'Set B', traces: [trace(90, 40)] };

  assert.deepEqual(mergeMeasurementSets([setA], [setA, setB]), {
    sets: [setA, setB],
    added: 1,
    skipped: 1,
  });
});

test('serializes a saved set back into parseable trace inputs', () => {
  const set = { id: 'a', name: 'Set A', traces: [trace(100, 50), trace(120, 60)] };
  const restored = serializeSetTracesForInputs(set).map((value) => normalizeTrace(JSON.parse(value)));

  assert.equal(restored.length, 2);
  assert.equal(extract(restored[0]).elapsedMs, 100);
  assert.equal(extract(restored[1]).rpcDurationMs, 60);
});

test('summarizes p50 to p90 tail, stability, and confidence', () => {
  assert.deepEqual(summarizePercentiles(50, 100, 4), {
    p50Position: 50,
    p90Position: 100,
    delta: 50,
    percent: 100,
    stability: 'volatile',
    confidence: 'few samples',
  });
  assert.deepEqual(summarizePercentiles(90, 99, 20), {
    p50Position: (90 / 99) * 100,
    p90Position: 100,
    delta: 9,
    percent: 10,
    stability: 'stable',
    confidence: 'enough samples',
  });
  assert.deepEqual(summarizePercentiles(0, 0, 1), {
    p50Position: 0,
    p90Position: 0,
    delta: 0,
    percent: 0,
    stability: 'stable',
    confidence: 'few samples',
  });
});

test('describes sample confidence label and badge class', () => {
  assert.deepEqual(describeSampleConfidence(4), {
    label: 'few samples',
    badgeClass: 'tail-badge-warn',
  });
  assert.deepEqual(describeSampleConfidence(10), {
    label: 'enough samples',
    badgeClass: 'tail-badge-ok',
  });
});

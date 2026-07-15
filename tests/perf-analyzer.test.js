const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildComparisonRows,
  buildComparisonSummary,
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
const { buildSampleTimeline } = require('../src/timeline.js');
const { filterBackendGroups, getMeasurementSetRemovalCopy } = require('../src/app.js');

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

test('builds an additive per-sample milestone timeline', () => {
  const timeline = buildSampleTimeline({
    elapsedMs: 400,
    profileAt: 20,
    rpcStartAt: 50,
    rpcFinishedAt: 250,
    coldViewAt: 300,
    raf1At: 340,
    raf2At: 400,
  });

  assert.deepEqual(timeline.segments.map((segment) => [segment.label, segment.durationMs]), [
    ['Profile resolve', 20],
    ['Pre-RPC setup', 30],
    ['Resume RPC', 200],
    ['Publish view', 50],
    ['View → RAF1', 40],
    ['RAF1 → RAF2', 60],
  ]);
  assert.equal(timeline.segments.reduce((sum, segment) => sum + segment.durationMs, 0), 400);
  assert.equal(timeline.measuredMs, 400);
  assert.equal(timeline.gapMs, 0);
  assert.deepEqual(timeline.missingStages, []);
  assert.deepEqual(timeline.warnings, []);

  const rpc = timeline.segments.find((segment) => segment.label === 'Resume RPC');
  assert.deepEqual(
    {
      startMs: rpc.startMs,
      endMs: rpc.endMs,
      share: rpc.share,
      sourceFrom: rpc.sourceFrom,
      sourceTo: rpc.sourceTo,
    },
    {
      startMs: 50,
      endMs: 250,
      share: 50,
      sourceFrom: 'resume-rpc-start',
      sourceTo: 'resume-rpc-finished',
    },
  );
});

test('bridges missing milestones with explicit uninstrumented gaps', () => {
  const timeline = buildSampleTimeline({
    elapsedMs: 400,
    rpcStartAt: 50,
    rpcFinishedAt: 250,
    raf2At: 400,
  });

  assert.deepEqual(timeline.segments.map((segment) => [segment.kind, segment.durationMs]), [
    ['gap', 50],
    ['phase', 200],
    ['gap', 150],
  ]);
  assert.equal(timeline.measuredMs, 200);
  assert.equal(timeline.gapMs, 200);
  assert.deepEqual(timeline.missingStages, [
    'profile-resolve-finished',
    'cold-view-published',
    'paint-raf-1',
  ]);
});

test('drops non-monotonic milestones without producing negative segments', () => {
  const timeline = buildSampleTimeline({
    elapsedMs: 200,
    profileAt: 50,
    rpcStartAt: 40,
    rpcFinishedAt: 120,
    coldViewAt: 150,
    raf1At: 180,
    raf2At: 200,
  });

  assert.equal(timeline.segments.reduce((sum, segment) => sum + segment.durationMs, 0), 200);
  assert.ok(timeline.segments.every((segment) => segment.durationMs > 0));
  assert.deepEqual(timeline.warnings, [
    {
      type: 'non-monotonic',
      stage: 'resume-rpc-start',
      atMs: 40,
      previousAtMs: 50,
    },
  ]);
  assert.equal(timeline.segments.some((segment) => segment.kind === 'gap'), true);
});

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

test('filters backend groups to metrics with significant tails', () => {
  const groups = [
    {
      id: 'critical',
      metrics: [
        { key: 'handlerMs', presentation: { impact: { key: 'significant' } } },
        { key: 'outsideHandlerMs', presentation: { impact: { key: 'moderate' } } },
      ],
    },
    {
      id: 'state',
      metrics: [{ key: 'agentBuildActiveCount', presentation: { impact: null } }],
    },
  ];

  assert.equal(filterBackendGroups(groups, 'all'), groups);
  assert.deepEqual(filterBackendGroups(groups, 'significant'), [
    {
      id: 'critical',
      metrics: [{ key: 'handlerMs', presentation: { impact: { key: 'significant' } } }],
    },
  ]);
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

  assert.deepEqual(buildComparisonSummary(comparison), {
    valueA: 110,
    valueB: 90,
    delta: -20,
    percent: elapsed.percent,
    key: 'faster',
    label: 'B faster',
  });
});

test('labels equal and unavailable total elapsed comparison summaries safely', () => {
  assert.deepEqual(buildComparisonSummary([{
    key: 'elapsedMs',
    valueA: 100,
    valueB: 100,
    delta: 0,
    percent: 0,
  }]), {
    valueA: 100,
    valueB: 100,
    delta: 0,
    percent: 0,
    key: 'neutral',
    label: 'No material change',
  });
  assert.deepEqual(buildComparisonSummary([]), {
    valueA: NaN,
    valueB: NaN,
    delta: NaN,
    percent: NaN,
    key: 'unavailable',
    label: 'No comparable total',
  });
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
  assert.match(report, /OVERALL p50 total elapsed: A 110\.0 ms \| B 90\.0 ms \| delta -20\.0 ms \| change -18\.2% \| B faster/);
  assert.match(report, /P90 METRICS/);
  assert.match(report, /P95 METRICS/);
});

test('normalizes a raw stages array before extraction', () => {
  const stages = trace(200, 60).stages;
  const normalized = normalizeTrace(stages);
  const row = extract(normalized);

  assert.equal(normalized.outcome, 'cold-resumed');
  assert.equal(row._rendererSelectionVersion, 8);
  assert.equal(row.elapsedMs, 200);
  assert.equal(row.rpcDurationMs, 60);
  assert.match(buildTextReport([row]), /analyzer: renderer-breakdown-v10 \| selector: linked-markdown-v8/);
});

test('omits backend aggregates, context, and sample fields when backend reporting is disabled', () => {
  const sample = trace(200, 60);
  Object.assign(sample.stages[1], {
    backendTimingVersion: 12,
    backendResumePrewarmMode: 'composer_intent',
    clientRequestReceiveAckMs: 45,
  });
  const row = extract(normalizeTrace(sample));
  const report = buildTextReport([row], { backend: false });

  assert.match(report, /^samples: 1$/m);
  assert.doesNotMatch(report, /backend context:/);
  assert.doesNotMatch(report, /BACKEND \/ TRANSPORT/);
  assert.doesNotMatch(report, /reqAck=/);
  assert.doesNotMatch(report, /handler=/);
  assert.doesNotMatch(report, /prewarm=/);
  assert.match(report, /SUMMARY/);
  assert.match(report, /RENDERER SCHEDULING/);
  assert.match(report, /FRAME \/ RAF SCHEDULING/);
  assert.match(report, /SAMPLES/);
});

test('filters aggregate and sample details by report section', () => {
  const row = extract(normalizeTrace(trace(200, 60)));
  const report = buildTextReport([row], {
    summary: false,
    renderer: false,
    raf: false,
    backend: false,
    samples: true,
  });

  assert.doesNotMatch(report, /SUMMARY/);
  assert.doesNotMatch(report, /RENDERER SCHEDULING/);
  assert.doesNotMatch(report, /FRAME \/ RAF SCHEDULING/);
  assert.doesNotMatch(report, /BACKEND \/ TRANSPORT/);
  assert.match(report, /SAMPLES/);
  assert.match(report, /elapsed=200\.0/);
  assert.match(report, /rpc=60\.0/);
  assert.doesNotMatch(report, /threadAt=/);
  assert.doesNotMatch(report, /raf2Wait=/);
  assert.doesNotMatch(report, /reqAck=/);
});

test('can omit per-sample rows while retaining selected aggregates', () => {
  const row = extract(normalizeTrace(trace(200, 60)));
  const report = buildTextReport([row], {
    renderer: false,
    raf: true,
    backend: false,
    samples: false,
  });

  assert.match(report, /SUMMARY/);
  assert.match(report, /FRAME \/ RAF SCHEDULING/);
  assert.doesNotMatch(report, /RENDERER SCHEDULING/);
  assert.doesNotMatch(report, /BACKEND \/ TRANSPORT/);
  assert.doesNotMatch(report, /SAMPLES/);
});

test('reports ACK blind-spot diagnostics and previous WebSocket work', () => {
  const sample = trace(200, 60);
  Object.assign(sample.stages[1], {
    backendWsEventLoopLagMs: 3,
    backendWsPreviousDispatchMs: 2500,
    backendWsPreviousMethod: 'commands.catalog',
    backendWsPreviousRequestFinishedAgoMs: 0.5,
    backendWsPreviousRequestMs: 2501,
    clientRequestReceiveAckMs: 2600,
    clientRequestReceiveAckRendererLagMs: 40,
    clientRequestReceiveAckUnattributedMs: 2560,
  });
  const row = extract(normalizeTrace(sample));
  const report = buildTextReport([row]);

  assert.equal(row.backend.wsPreviousMethod, 'commands.catalog');
  assert.equal(row.backend.wsPreviousDispatchMs, 2500);
  assert.equal(row.backend.wsPreviousRequestMs, 2501);
  assert.equal(row.backend.wsEventLoopLagMs, 3);
  assert.equal(row.backend.clientReqAckRendererLagMs, 40);
  assert.equal(row.backend.clientReqAckUnattributedMs, 2560);
  assert.match(report, /prev=commands\.catalog/);
  assert.match(report, /prevMs=2500\.0/);
  assert.match(report, /rendererLag=40\.0/);
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
      name: 'user-message-layout-commit',
      atMs: 184,
      renderBodyDurationMs: 1,
      renderToInsertionCommitMs: 10,
      insertionCommitToLayoutMs: 3,
      renderToLayoutCommitMs: 13,
    },
    {
      name: 'assistant-message-layout-commit',
      atMs: 188,
      messageId: 'assistant-dominant',
      renderBodyDurationMs: 2,
      renderToInsertionCommitMs: 14,
      insertionCommitToLayoutMs: 4,
      renderToLayoutCommitMs: 18,
    },
    {
      name: 'assistant-markdown-layout-commit',
      atMs: 187,
      messageId: 'assistant-dominant',
      renderBodyDurationMs: 1.5,
      renderToInsertionCommitMs: 12,
      insertionCommitToLayoutMs: 3,
      renderToLayoutCommitMs: 15,
    },
    {
      name: 'thread-message-list-layout-commit',
      atMs: 190,
      insertionCommitToLayoutMs: 5,
      renderBodyDurationMs: 2,
      renderToInsertionCommitMs: 15,
      renderToLayoutCommitMs: 20,
      runtimeSyncStartToRenderStartMs: 19,
    },
    { name: 'paint-raf-1', atMs: 220 },
    { name: 'paint-raf-2', atMs: 230, waitDurationMs: 129 },
  ]));

  assert.equal(row.adapterSyncToThreadRenderMs, 19);
  assert.equal(row.threadRenderBodyMs, 2);
  assert.equal(row.threadAfterBodyToInsertionMs, 13);
  assert.equal(row.threadInsertionToLayoutMs, 5);
  assert.equal(row.threadRenderToLayoutMs, 20);
  assert.equal(row.threadSelectedAtMs, 190);
  assert.equal(row.assistantMessageSelectedAtMs, 188);
  assert.equal(row.assistantMarkdownSelectedAtMs, 187);
  assert.equal(row.assistantMessageId, 'assistant-dominant');
  assert.equal(row.assistantMarkdownMessageId, 'assistant-dominant');
  assert.equal(row.assistantMessageMatchedToMarkdown, true);
  assert.equal(row.assistantMarkdownCandidateCount, 1);
  assert.equal(row.userMessageRenderBodyMs, 1);
  assert.equal(row.assistantMessageRenderBodyMs, 2);
  assert.equal(row.assistantMessageAfterBodyToInsertionMs, 12);
  assert.equal(row.assistantMessageInsertionToLayoutMs, 4);
  assert.equal(row.assistantMessageRenderToLayoutMs, 18);
  assert.equal(row.assistantMarkdownRenderBodyMs, 1.5);
  assert.equal(row.assistantMarkdownAfterBodyToInsertionMs, 10.5);
  assert.equal(row.assistantMarkdownInsertionToLayoutMs, 3);
  assert.equal(row.assistantMarkdownRenderToLayoutMs, 15);
  assert.equal(row.adapterSyncToThreadLayoutMs, 39);
  assert.equal(row.adapterSyncToMarkdownLayoutMs, 36);
  assert.equal(row.markdownLayoutToRaf1Ms, 33);
  assert.equal(row.raf1ToRaf2Ms, 10);
  assert.equal(row.paintWaitDur, 89);
});

test('matches the Assistant shell to the dominant Markdown message', () => {
  const row = extract(normalizeTrace([
    { name: 'resume-rpc-start', atMs: 10 },
    { name: 'resume-rpc-finished', atMs: 20, sincePreviousStageMs: 10 },
    { name: 'paint-wait-start', atMs: 21 },
    { name: 'runtime-adapter-synced', atMs: 30 },
    {
      name: 'assistant-message-layout-commit',
      atMs: 40,
      messageId: 'assistant-short',
      renderToLayoutCommitMs: 5,
    },
    {
      name: 'assistant-markdown-layout-commit',
      atMs: 41,
      messageId: 'assistant-short',
      renderToLayoutCommitMs: 10,
    },
    {
      name: 'assistant-message-layout-commit',
      atMs: 50,
      messageId: 'assistant-dominant',
      renderBodyDurationMs: 2,
      renderToInsertionCommitMs: 12,
      insertionCommitToLayoutMs: 4,
      renderToLayoutCommitMs: 16,
    },
    {
      name: 'thread-message-list-layout-commit',
      atMs: 55,
      renderToLayoutCommitMs: 20,
    },
    {
      name: 'assistant-markdown-layout-commit',
      atMs: 140,
      messageId: 'assistant-dominant',
      renderBodyDurationMs: 3,
      renderToInsertionCommitMs: 70,
      insertionCommitToLayoutMs: 20,
      renderToLayoutCommitMs: 90,
    },
    { name: 'paint-raf-1', atMs: 160 },
    { name: 'paint-raf-2', atMs: 180, waitDurationMs: 159 },
  ]));

  assert.equal(row.assistantMarkdownCandidateCount, 2);
  assert.equal(row.assistantMarkdownMessageId, 'assistant-dominant');
  assert.equal(row.assistantMessageId, 'assistant-dominant');
  assert.equal(row.assistantMessageMatchedToMarkdown, true);
  assert.equal(row.assistantMessageSelectedAtMs, 50);
  assert.equal(row.assistantMarkdownSelectedAtMs, 140);
  assert.equal(row.assistantMessageRenderToLayoutMs, 16);
  assert.equal(row.assistantMarkdownRenderToLayoutMs, 90);
  assert.equal(row.assistantLayoutToMarkdownLayoutMs, 90);
  assert.equal(row.adapterSyncToMarkdownLayoutMs, 110);
  assert.equal(row.threadLayoutToMarkdownLayoutMs, 85);
  assert.equal(row.markdownLayoutToRaf1Ms, 20);
  assert.equal(row.raf1ToRaf2Ms, 20);

  const report = buildTextReport([row]);
  assert.match(report, /note: aggregate percentiles are independent distributions and are not an additive critical path/);
  assert.match(report, /markdownAt=140\.0/);
  assert.match(report, /markdownMsg=assistant-dominant/);
  assert.match(report, /assistantMatched=yes/);
  assert.match(report, /markdownCandidates=2/);
  assert.match(report, /adapterMarkdown=110\.0/);
  assert.match(report, /markdownRaf1=20\.0/);
  assert.match(report, /FRAME \/ RAF SCHEDULING/);
  assert.match(report, /Dominant Markdown layout → RAF1/);
  assert.match(report, /RAF1 → RAF2/);
});

test('does not report an unrelated Assistant when the selected Markdown has no matching shell', () => {
  const row = extract(normalizeTrace([
    { name: 'resume-rpc-start', atMs: 10 },
    { name: 'resume-rpc-finished', atMs: 20, sincePreviousStageMs: 10 },
    { name: 'runtime-adapter-synced', atMs: 30 },
    {
      name: 'assistant-message-layout-commit',
      atMs: 40,
      messageId: 'assistant-unrelated',
      renderToLayoutCommitMs: 5,
    },
    {
      name: 'assistant-markdown-layout-commit',
      atMs: 50,
      messageId: 'assistant-selected',
      renderToLayoutCommitMs: 20,
    },
  ]));

  assert.equal(row.assistantMarkdownMessageId, 'assistant-selected');
  assert.equal(row.assistantMessageId, null);
  assert.equal(row.assistantMessageMatchedToMarkdown, false);
  assert.equal(Number.isFinite(row.assistantMessageRenderToLayoutMs), false);
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

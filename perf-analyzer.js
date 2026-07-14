const EXAMPLE_TRACE = {
  elapsedMs: 2155.6,
  outcome: 'cold-resumed',
  requestId: 1,
  session: '20260…5de2f1',
  stages: [
    { atMs: 0.2, sincePreviousStageMs: 0.2, name: 'initial-cache', warm: false },
    { atMs: 0.3, sincePreviousStageMs: 0.1, name: 'profile-resolve-start', sessionWasInSidebar: false },
    {
      atMs: 4.6,
      sincePreviousStageMs: 4.3,
      name: 'runtime-message-repository-built',
      operationDurationMs: 0,
      coalescedCount: 0,
      headIdPresent: false,
      messageCount: 0,
      repositoryVisibleMessageCount: 0,
    },
    {
      atMs: 29.9,
      sincePreviousStageMs: 25.3,
      name: 'thread-message-list-layout-commit',
      groupCount: 0,
      hiddenGroupCount: 0,
      mountedMessageCount: 0,
      visibleGroupCount: 0,
    },
    {
      atMs: 31.3,
      sincePreviousStageMs: 1.4,
      name: 'desktop-layout-commit',
      routeSessionMatch: true,
      routedSession: true,
    },
    {
      atMs: 32.3,
      sincePreviousStageMs: 1,
      name: 'runtime-adapter-synced',
      messageCount: 0,
      operationDurationMs: 0.3,
    },
    {
      atMs: 1581.6,
      sincePreviousStageMs: 1549.3,
      name: 'profile-resolve-finished',
      profileResolved: true,
      sessionWasInSidebar: false,
    },
    { atMs: 1581.6, sincePreviousStageMs: 0, name: 'gateway-profile-start', profileSwitch: false },
    { atMs: 1581.7, sincePreviousStageMs: 0.1, name: 'gateway-profile-finished', profileSwitch: false },
    { atMs: 1581.9, sincePreviousStageMs: 0.2, name: 'resume-rpc-start' },
    {
      atMs: 1901.9,
      sincePreviousStageMs: 320,
      name: 'resume-rpc-finished',
      backendAgentBuildActiveCount: 0,
      backendDbOpenMs: 234.74,
      backendDispatchQueueMs: 0.79,
      backendEventLoopQueueMs: 0.53,
      backendHandlerMs: 305.8,
      backendHandlerToWriteMs: 0.02,
      backendHistoryReadMs: 2.97,
      backendJsonSerializeMs: 1.26,
      backendLiveLookupMs: 0.02,
      backendLiveRegisterMs: 53.36,
      backendMessageTransportMs: 1.47,
      backendPromptSetupMs: 0.13,
      backendRecordPrepareMs: 4.66,
      backendReopenMs: 0.3,
      backendResumeInfoMs: 0.71,
      backendSessionLookupMs: 0.38,
      backendSlotClaimMs: 4.95,
      backendTimingVersion: 7,
      backendTipResolveMs: 2.11,
      backendWsAckSendMs: 0.22,
      backendWsReceiveToAckMs: 0.01,
      clientJsonParseMs: 0.1,
      clientMessageEventQueueMs: 0.1,
      clientReceiveAckEventQueueMs: 0,
      clientReceiveAckToResponseMs: 251.1,
      clientRequestReceiveAckMs: 68.5,
      clientRequestReceiveAckTransportMs: 68.5,
      clientRequestSendMs: 0.1,
      clientResponseChars: 46699,
      outsideHandlerRoundTripMs: 13.9,
      unmeasuredRoundTripMs: 10.8,
      messageCount: 24,
      rpcDurationMs: 319.7,
    },
    {
      atMs: 1903.4,
      sincePreviousStageMs: 1.5,
      name: 'transcript-transformed',
      transformDurationMs: 1.5,
      messageCount: 14,
    },
    { atMs: 1904, sincePreviousStageMs: 0.6, name: 'cold-view-published', messageCount: 14 },
    { atMs: 1904.1, sincePreviousStageMs: 0.1, name: 'paint-wait-start', rafCount: 2, waitMethod: 'double-raf' },
    {
      atMs: 1914.4,
      sincePreviousStageMs: 10.3,
      name: 'runtime-message-repository-built',
      operationDurationMs: 1.1,
      coalescedCount: 14,
      headIdPresent: true,
      messageCount: 14,
      repositoryVisibleMessageCount: 14,
    },
    {
      atMs: 1992.6,
      sincePreviousStageMs: 78.2,
      name: 'runtime-adapter-synced',
      messageCount: 14,
      operationDurationMs: 0.8,
    },
    {
      atMs: 2140,
      sincePreviousStageMs: 147.4,
      name: 'thread-message-list-layout-commit',
      groupCount: 7,
      hiddenGroupCount: 6,
      mountedMessageCount: 2,
      visibleGroupCount: 1,
    },
    { atMs: 2148.7, sincePreviousStageMs: 8.7, name: 'paint-raf-1', waitDurationMs: 244.6, rafCount: 1, waitMethod: 'double-raf' },
    {
      atMs: 2152.6,
      sincePreviousStageMs: 3.9,
      name: 'resume-response-sent',
      backendJsonSerializeMs: 1.26,
      backendPrefixFrameCount: 0,
      backendPrefixSendMs: 0,
      backendResponseSendMs: 2.36,
      backendSendTotalMs: 2.37,
    },
    { atMs: 2155.5, sincePreviousStageMs: 2.9, name: 'paint-raf-2', waitDurationMs: 251.4, rafCount: 2, waitMethod: 'double-raf' },
  ],
  messageCount: 14,
  profileSwitch: false,
};

const GROUPS = [
  {
    icon: 'timer',
    label: 'Top-level',
    metrics: [
      { key: 'elapsedMs', label: 'elapsedMs', desc: 'Total time to final paint' },
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
    label: 'Paint pipeline',
    metrics: [
      { key: 'paintWaitDur', label: 'paint-wait → layout-commit · Δ', desc: 'Double-RAF wait before layout' },
      { key: 'raf2WaitMs', label: 'paint-raf-2 · waitDurationMs', desc: 'Total double-RAF wait reported' },
      { key: 'resumeRespAt', label: 'resume-response-sent · atMs', desc: 'Backend response sent (new format)' },
      { key: 'raf1At', label: 'paint-raf-1 · atMs', desc: 'First RAF fired' },
      { key: 'raf2At', label: 'paint-raf-2 · atMs', desc: 'Second RAF (≈ elapsedMs)' },
    ],
  },
];

const BACKEND_FIELDS = [
  { key: 'outsideHandlerMs', label: 'Outside handler RTT', desc: 'Full round-trip outside backend handler' },
  { key: 'unmeasuredMs', label: 'Unmeasured RTT', desc: 'RTT not covered by instrumentation' },
  { key: 'clientReqAckMs', label: 'Client → ACK', desc: 'Time until client received RPC ack' },
  { key: 'clientReqAckTransportMs', label: 'Client → ACK transport', desc: 'ACK wait excluding renderer event queue' },
  { key: 'clientAckEventQueueMs', label: 'ACK event queue', desc: 'Renderer queue before ACK callback' },
  { key: 'clientAckToRespMs', label: 'ACK → response', desc: 'Time from ACK to full response received' },
  { key: 'clientMessageQueueMs', label: 'Response event queue', desc: 'Renderer queue before response callback' },
  { key: 'handlerMs', label: 'Backend handler', desc: 'Pure handler execution time' },
  { key: 'dispatchQueueMs', label: 'Dispatch queue', desc: 'Backend RPC pool queue wait' },
  { key: 'eventLoopQueueMs', label: 'Response loop queue', desc: 'Transport write → event-loop send coroutine' },
  { key: 'handlerToWriteMs', label: 'Handler → write', desc: 'Handler return → transport write' },
  { key: 'historyReadMs', label: 'History DB read', desc: 'Reading message history from SQLite' },
  { key: 'dbOpenMs', label: 'DB open', desc: 'Opening the session database' },
  { key: 'sessionLookupMs', label: 'Session lookup', desc: 'Session lookup in DB' },
  { key: 'liveLookupMs', label: 'Live lookup', desc: 'Looking up the live session' },
  { key: 'liveRegisterMs', label: 'Live register', desc: 'Registering the resumed live session' },
  { key: 'reopenMs', label: 'Session reopen', desc: 'Reopening the persisted session' },
  { key: 'tipResolveMs', label: 'Tip resolve', desc: 'Resolving the session tip' },
  { key: 'slotClaimMs', label: 'Slot claim', desc: 'Live session slot claim' },
  { key: 'recordPrepareMs', label: 'Record prepare', desc: 'Preparing response record' },
  { key: 'resumeInfoMs', label: 'Resume info', desc: 'Resume info fetch' },
  { key: 'promptSetupMs', label: 'Prompt setup', desc: 'Setting up prompt' },
  { key: 'messageTransportMs', label: 'Message transport', desc: 'Serialization + send' },
  { key: 'jsonSerializeMs', label: 'JSON serialize', desc: 'Backend JSON serialize' },
  { key: 'wsReceiveToAckMs', label: 'WS receive → ACK', desc: 'Backend work after receive_text returned' },
  { key: 'wsAckSendMs', label: 'WS ACK send', desc: 'ACK flush and send on backend' },
  { key: 'responseSendMs', label: 'Response send', desc: 'Backend response send_text duration' },
  { key: 'responseSendTotalMs', label: 'Response send total', desc: 'Buffered prefix plus response send' },
  { key: 'agentBuildActiveCount', label: 'Agent builds active', desc: 'Active builds when backend received request', unit: 'count' },
  { key: 'agentBuildActiveMaxMs', label: 'Active build elapsed', desc: 'Longest active build elapsed at ACK' },
  { key: 'agentBuildLastDurMs', label: 'Agent build (last)', desc: 'Last agent init duration' },
  { key: 'agentBuildLastAgoMs', label: 'Agent build (ago)', desc: 'How long ago agent was last built' },
  { key: 'clientJsonParseMs', label: 'Client JSON parse', desc: 'Client-side parse time' },
  { key: 'clientRespChars', label: 'Response size', desc: 'Serialized response length', unit: 'chars' },
];

const COMPARISON_METRICS = [
  { label: 'Total elapsed', key: 'elapsedMs' },
  { label: 'Profile ready at', key: 'profileAt' },
  { label: 'Resume RPC', key: 'rpcDurationMs' },
  { label: 'Cold view published at', key: 'coldViewAt' },
  { label: 'Paint wait', key: 'raf2WaitMs' },
  { label: 'Backend handler', subKey: 'handlerMs' },
  { label: 'DB open', subKey: 'dbOpenMs' },
  { label: 'Live lookup', subKey: 'liveLookupMs' },
  { label: 'Live register', subKey: 'liveRegisterMs' },
  { label: 'Session reopen', subKey: 'reopenMs' },
  { label: 'Tip resolve', subKey: 'tipResolveMs' },
  { label: 'Outside handler RTT', subKey: 'outsideHandlerMs' },
];

const MEASUREMENT_SETS_STORAGE_KEY = 'hermes-perf-analyzer.measurement-sets.v1';

const $ = (id) => document.getElementById(id);
const fmt = (value, digits = 1) => (isNaN(value) || value == null ? '—' : Number(value).toFixed(digits));
const fmtMs = (value) => `${fmt(value)} ms`;

let lastTextReport = '';
let lastComparisonReport = '';
let traceCount = 0;
let currentTraces = [];
let measurementSets = [];
let selectedSetIds = [];
let measurementStorage = null;

function iconMarkup(iconId, className = 'icon') {
  return `<svg class="${className}" aria-hidden="true"><use href="#icon-${iconId}"></use></svg>`;
}

function iconLabelMarkup(iconId, label) {
  return `<span class="label-with-icon">${iconMarkup(iconId, 'icon icon-group')}<span>${label}</span></span>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function percentile(values, percentileValue) {
  const sorted = [...values].filter((value) => !isNaN(value) && value != null).sort((a, b) => a - b);
  if (!sorted.length) return NaN;
  if (sorted.length === 1) return sorted[0];
  const index = (percentileValue / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  return sorted[lower] + (index - lower) * (sorted[upper] - sorted[lower]);
}

function median(values) {
  return percentile(values, 50);
}

function p90(values) {
  return percentile(values, 90);
}

function p95(values) {
  return percentile(values, 95);
}

function stageFirst(stages, name) {
  return stages.find((stage) => stage.name === name) || null;
}

function stageLast(stages, name) {
  return [...stages].reverse().find((stage) => stage.name === name) || null;
}

function stagesAll(stages, name) {
  return stages.filter((stage) => stage.name === name);
}

function detectFormat(trace) {
  const stages = trace.stages || [];
  const rpcStartIndex = stages.findIndex((stage) => stage.name === 'resume-rpc-start');
  const repoBuiltIndex = stages.findIndex((stage) => stage.name === 'runtime-message-repository-built');
  if (rpcStartIndex === -1) return 'unknown';
  return repoBuiltIndex >= 0 && repoBuiltIndex < rpcStartIndex ? 'new' : 'old';
}

function normalizeTrace(value) {
  if (Array.isArray(value)) {
    const rpc = value.find((stage) => stage?.name === 'resume-rpc-finished') || {};
    return {
      elapsedMs: value.reduce((max, stage) => Math.max(max, Number(stage?.atMs) || 0), 0),
      messageCount: rpc.messageCount,
      outcome: 'cold-resumed',
      stages: value,
    };
  }
  if (value && typeof value === 'object' && Array.isArray(value.stages)) return value;
  throw new Error('Expected a trace object or an array of stages');
}

function extract(trace) {
  const stages = trace.stages || [];
  const format = detectFormat(trace);
  const rpcStartIndex = stages.findIndex((stage) => stage.name === 'resume-rpc-start');
  const preRpcStages = rpcStartIndex >= 0 ? stages.slice(0, rpcStartIndex) : [];
  const postRpcStages = rpcStartIndex >= 0 ? stages.slice(rpcStartIndex + 1) : stages;
  const rpcFinished = stages.find((stage) => stage.name === 'resume-rpc-finished') || {};
  const elapsedMs = Number.isFinite(trace.elapsedMs)
    ? trace.elapsedMs
    : stages.reduce((max, stage) => Math.max(max, Number(stage.atMs) || 0), 0);
  const profileAt = (stageFirst(stages, 'profile-resolve-finished') || {}).atMs;
  const rpcStartAt = rpcStartIndex >= 0 ? stages[rpcStartIndex].atMs : NaN;
  const rpcFinishedAt = rpcFinished.atMs;
  const rpcDuration = rpcFinished.sincePreviousStageMs;
  const rpcDurationMs = rpcFinished.rpcDurationMs ?? rpcDuration;
  const preRepoBuilt = format === 'new' ? stageFirst(preRpcStages, 'runtime-message-repository-built') || {} : {};
  const preAdapterSync = format === 'new' ? stageFirst(preRpcStages, 'runtime-adapter-synced') || {} : {};
  const postRepoBuilt = stagesAll(postRpcStages, 'runtime-message-repository-built')[0] || {};
  const postAdapter = stagesAll(postRpcStages, 'runtime-adapter-synced')[0] || {};
  const transcriptStage = stageFirst(postRpcStages, 'transcript-transformed') || {};
  const coldViewAt = (stageFirst(stages, 'cold-view-published') || {}).atMs;
  const paintWaitAt = (stageFirst(stages, 'paint-wait-start') || {}).atMs;
  const raf1 = stageLast(stages, 'paint-raf-1') || {};
  const raf2 = stageLast(stages, 'paint-raf-2') || {};
  const threadLayoutAfterPaint = stages.filter(
    (stage) => stage.name === 'thread-message-list-layout-commit' && stage.atMs > (paintWaitAt || 0),
  );
  const paintWaitDur = threadLayoutAfterPaint.length && !isNaN(paintWaitAt)
    ? threadLayoutAfterPaint[0].atMs - paintWaitAt
    : NaN;
  const resumeResponseSent = stageFirst(stages, 'resume-response-sent') || {};
  const readBackend = (key) => rpcFinished[key] ?? NaN;
  const backend = {
    handlerMs: readBackend('backendHandlerMs'),
    historyReadMs: readBackend('backendHistoryReadMs'),
    dbOpenMs: readBackend('backendDbOpenMs'),
    sessionLookupMs: readBackend('backendSessionLookupMs'),
    liveLookupMs: readBackend('backendLiveLookupMs'),
    liveRegisterMs: readBackend('backendLiveRegisterMs'),
    reopenMs: readBackend('backendReopenMs'),
    tipResolveMs: readBackend('backendTipResolveMs'),
    recordPrepareMs: readBackend('backendRecordPrepareMs'),
    slotClaimMs: readBackend('backendSlotClaimMs'),
    resumeInfoMs: readBackend('backendResumeInfoMs'),
    promptSetupMs: readBackend('backendPromptSetupMs'),
    jsonSerializeMs: readBackend('backendJsonSerializeMs'),
    messageTransportMs: readBackend('backendMessageTransportMs'),
    eventLoopQueueMs: readBackend('backendEventLoopQueueMs'),
    dispatchQueueMs: readBackend('backendDispatchQueueMs'),
    handlerToWriteMs: readBackend('backendHandlerToWriteMs'),
    wsReceiveToAckMs: readBackend('backendWsReceiveToAckMs'),
    wsAckSendMs: readBackend('backendWsAckSendMs'),
    agentBuildActiveCount: readBackend('backendAgentBuildActiveCount'),
    agentBuildActiveMaxMs: readBackend('backendAgentBuildActiveMaxElapsedMs'),
    agentBuildLastDurMs: readBackend('backendAgentBuildLastDurationMs'),
    agentBuildLastAgoMs: readBackend('backendAgentBuildLastFinishedAgoMs'),
    clientReqAckMs: readBackend('clientRequestReceiveAckMs'),
    clientReqAckTransportMs: readBackend('clientRequestReceiveAckTransportMs'),
    clientAckEventQueueMs: readBackend('clientReceiveAckEventQueueMs'),
    clientAckToRespMs: readBackend('clientReceiveAckToResponseMs'),
    clientMessageQueueMs: readBackend('clientMessageEventQueueMs'),
    clientJsonParseMs: readBackend('clientJsonParseMs'),
    outsideHandlerMs: readBackend('outsideHandlerRoundTripMs'),
    unmeasuredMs: readBackend('unmeasuredRoundTripMs'),
    clientRespChars: readBackend('clientResponseChars'),
    responseSendMs: resumeResponseSent.backendResponseSendMs ?? NaN,
    responseSendTotalMs: resumeResponseSent.backendSendTotalMs ?? NaN,
    timingVersion: readBackend('backendTimingVersion'),
    resumePrewarmEnabled: rpcFinished.backendResumePrewarmEnabled ?? null,
    resumePrewarmMode: rpcFinished.backendResumePrewarmMode ?? null,
  };

  return {
    _format: format,
    _hasBackend: !isNaN(backend.handlerMs),
    elapsedMs,
    profileAt,
    rpcStartAt,
    rpcDuration,
    rpcDurationMs,
    rpcFinishedAt,
    preRepoBuiltAt: preRepoBuilt.atMs,
    preAdapterAt: preAdapterSync.atMs,
    postRepoBuiltAt: postRepoBuilt.atMs,
    postAdapterAt: postAdapter.atMs,
    transcriptMs: transcriptStage.sincePreviousStageMs,
    coldViewAt,
    paintWaitAt,
    paintWaitDur,
    resumeRespAt: resumeResponseSent.atMs,
    raf1At: raf1.atMs,
    raf2At: raf2.atMs,
    raf2WaitMs: raf2.waitDurationMs,
    messageCount: rpcFinished.messageCount ?? trace.messageCount,
    backend,
  };
}

function computeStats(rows, key, subKey) {
  const values = rows
    .map((row) => (subKey ? row.backend[subKey] : row[key]))
    .filter((value) => !isNaN(value) && value != null);
  if (!values.length) return null;
  return {
    med: median(values),
    p90: p90(values),
    p95: p95(values),
    min: Math.min(...values),
    max: Math.max(...values),
    n: values.length,
  };
}

function summarizePercentiles(p50, p90Value, sampleCount) {
  const scaleMax = Math.max(
    Number.isFinite(p50) ? p50 : 0,
    Number.isFinite(p90Value) ? p90Value : 0,
    0,
  );
  const delta = Number.isFinite(p50) && Number.isFinite(p90Value) ? p90Value - p50 : NaN;
  const percent = Number.isFinite(delta) && p50 !== 0
    ? (delta / p50) * 100
    : delta === 0
      ? 0
      : NaN;
  const stability = !Number.isFinite(percent)
    ? 'volatile'
    : percent <= 10
      ? 'stable'
      : percent <= 30
        ? 'moderate'
        : 'volatile';
  return {
    p50Position: scaleMax === 0 ? 0 : Math.max(0, Math.min(100, (p50 / scaleMax) * 100)),
    p90Position: scaleMax === 0 ? 0 : Math.max(0, Math.min(100, (p90Value / scaleMax) * 100)),
    delta,
    percent,
    stability,
    confidence: sampleCount < 10 ? 'low confidence' : 'supported',
  };
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

function buildComparisonTextReport(setA, setB, comparisonRows, rowsA, rowsB) {
  const oneLine = (value) => String(value).replace(/\s+/g, ' ').trim();
  const contextA = buildBackendContextLabels(rowsA).join(', ') || 'no backend timing';
  const contextB = buildBackendContextLabels(rowsB).join(', ') || 'no backend timing';
  const lines = [
    'HERMES MEASUREMENT SET COMPARISON',
    `A: ${oneLine(setA.name)} | samples: ${setA.traces.length}`,
    `A backend: ${contextA}`,
    `B: ${oneLine(setB.name)} | samples: ${setB.traces.length}`,
    `B backend: ${contextB}`,
    'delta: B - A | negative means B is faster',
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

function nextSetName(setCount) {
  let value = setCount;
  let suffix = '';
  do {
    suffix = String.fromCharCode(65 + (value % 26)) + suffix;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);
  return `Set ${suffix}`;
}

function selectSetForComparison(selectedIds, setId) {
  const nextIds = selectedIds.filter((id) => id !== setId);
  if (nextIds.length === 2) nextIds.shift();
  nextIds.push(setId);
  return nextIds;
}

function shouldAppendTrailingTrace(values, editedIndex) {
  return editedIndex === values.length - 1 && Boolean(values[editedIndex]?.trim());
}

function reportStat(label, stats, unit = 'ms') {
  if (!stats) return null;
  const suffix = unit === 'count' ? '' : unit === 'chars' ? ' ch' : ' ms';
  return `${label.padEnd(31)} p50 ${fmt(stats.med).padStart(8)}${suffix}  p90 ${fmt(stats.p90).padStart(8)}${suffix}  p95 ${fmt(stats.p95).padStart(8)}${suffix}  min ${fmt(stats.min).padStart(8)}  max ${fmt(stats.max).padStart(8)}`;
}

function buildTextReport(rows) {
  const timingVersions = [...new Set(rows.map((row) => row.backend.timingVersion).filter(Number.isFinite))]
    .sort((a, b) => a - b)
    .map((version) => `v${version}`)
    .join(', ') || 'legacy';
  const activeBuildSamples = rows.filter((row) => row.backend.agentBuildActiveCount > 0).length;
  const backendContexts = buildBackendContextLabels(rows).join(' | ') || 'none';
  const lines = [
    'HERMES COLD-RESUME PERFORMANCE REPORT',
    `samples: ${rows.length} | timing: ${timingVersions} | active-build samples: ${activeBuildSamples}/${rows.length}`,
    `backend context: ${backendContexts}`,
    '',
    'SUMMARY',
    reportStat('Total elapsed', computeStats(rows, 'elapsedMs')),
    reportStat('Resume RPC', computeStats(rows, 'rpcDurationMs')),
    reportStat('Cold view published at', computeStats(rows, 'coldViewAt')),
    reportStat('Paint wait', computeStats(rows, 'raf2WaitMs')),
    '',
    'BACKEND / TRANSPORT',
  ].filter((line) => line !== null);

  BACKEND_FIELDS.forEach((field) => {
    const line = reportStat(field.label, computeStats(rows, null, field.key), field.unit);
    if (line) lines.push(line);
  });

  lines.push('', 'SAMPLES');
  rows.forEach((row, index) => {
    const backend = row.backend;
    lines.push([
      `#${String(index + 1).padStart(2, '0')}`,
      `elapsed=${fmt(row.elapsedMs)}`,
      `rpc=${fmt(row.rpcDurationMs)}`,
      `reqAck=${fmt(backend.clientReqAckMs)}`,
      `ackResp=${fmt(backend.clientAckToRespMs)}`,
      `handler=${fmt(backend.handlerMs)}`,
      `paint=${fmt(row.raf2WaitMs)}`,
      `messages=${row.messageCount ?? '?'}`,
      `builds=${fmt(backend.agentBuildActiveCount, 0)}`,
      `timing=v${Number.isFinite(backend.timingVersion) ? fmt(backend.timingVersion, 0) : '?'}`,
      `prewarm=${formatPrewarmMode(backend)}`,
    ].join(' | '));
  });

  return lines.join('\n');
}

async function copyToClipboard(text, button, copiedLabel, defaultLabel) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }
  button.innerHTML = `${iconMarkup('check', 'icon icon-button')}<span>${copiedLabel}</span>`;
  button.setAttribute('aria-label', copiedLabel);
  window.setTimeout(() => {
    button.textContent = defaultLabel;
    button.removeAttribute('aria-label');
  }, 1600);
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

function colorClass(value, max) {
  const ratio = max > 0 ? value / max : 0;
  if (ratio < 0.35) return 'good';
  if (ratio < 0.65) return 'medium';
  return 'bad';
}

function isValidStoredSet(value) {
  if (!value || typeof value !== 'object' || !Array.isArray(value.traces) || !value.traces.length) return false;
  if (typeof value.id !== 'string' || typeof value.name !== 'string') return false;
  try {
    value.traces.forEach(normalizeTrace);
    return true;
  } catch (_) {
    return false;
  }
}

function loadMeasurementSets(storage) {
  if (!storage) return [];
  try {
    const stored = JSON.parse(storage.getItem(MEASUREMENT_SETS_STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(isValidStoredSet) : [];
  } catch (_) {
    return [];
  }
}

function persistMeasurementSets(storage, sets) {
  if (!storage) return false;
  try {
    storage.setItem(MEASUREMENT_SETS_STORAGE_KEY, JSON.stringify(sets));
    return true;
  } catch (_) {
    return false;
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

function formatSigned(value, suffix = '') {
  if (!Number.isFinite(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${fmt(value)}${suffix}`;
}

function deltaClass(delta) {
  if (!Number.isFinite(delta) || Math.abs(delta) < 0.05) return 'delta-neutral';
  return delta < 0 ? 'delta-good' : 'delta-bad';
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
        <button class="set-remove" type="button" data-action="remove-set" title="Delete set" aria-label="Delete ${escapeHtml(set.name)}">
          ${iconMarkup('close', 'icon icon-button')}
        </button>
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
  const removeButton = event.target.closest('[data-action="remove-set"]');
  if (!removeButton) return;
  const setId = removeButton.closest('[data-set-id]')?.dataset.setId;
  if (!setId) return;
  const nextSets = measurementSets.filter((set) => set.id !== setId);
  if (!persistMeasurementSets(measurementStorage, nextSets)) return;
  measurementSets = nextSets;
  selectedSetIds = selectedSetIds.filter((id) => id !== setId);
  renderMeasurementSets();
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
    $('backendGrid').innerHTML = BACKEND_FIELDS.map((field) => {
      const stats = computeStats(backendRows, null, field.key);
      if (!stats || stats.n === 0) return '';
      const unit = field.unit === 'count' ? '' : field.unit === 'chars' ? ' chars' : ' ms';
      const summary = summarizePercentiles(stats.med, stats.p90, stats.n);
      const rangeStart = Math.min(summary.p50Position, summary.p90Position);
      const rangeWidth = Math.abs(summary.p90Position - summary.p50Position);
      return `<div class="backend-card">
        <div class="bc-label">${field.label}</div>
        <div class="bc-vals"><span>p50 ${fmt(stats.med)}${unit}</span><span>p90 ${fmt(stats.p90)}${unit}</span></div>
        <div class="bc-sub">${field.desc}</div>
        <div class="bc-tail">
          <span class="tail-value tail-${summary.stability}">tail ${formatSigned(summary.delta, unit)} · ${formatSigned(summary.percent, '%')}</span>
          <span class="tail-confidence">n=${stats.n} · ${summary.confidence}</span>
        </div>
        <div class="percentile-track" title="p50 ${fmt(stats.med)}${unit}; p90 ${fmt(stats.p90)}${unit}">
          <div class="percentile-range" style="left:${rangeStart.toFixed(1)}%;width:${rangeWidth.toFixed(1)}%"></div>
          <span class="percentile-marker p50" style="left:${summary.p50Position.toFixed(1)}%"></span>
          <span class="percentile-marker p90" style="left:${summary.p90Position.toFixed(1)}%"></span>
        </div>
      </div>`;
    }).join('');
  } else {
    backendSection.style.display = 'none';
    $('backendContext').innerHTML = '';
  }

  lastTextReport = buildTextReport(rows);
  $('textReportOutput').textContent = lastTextReport;

  const maxElapsed = Math.max(...rows.map((row) => row.elapsedMs).filter((value) => !isNaN(value)), 1);
  $('sampleCards').innerHTML = rows.map((row, index) => {
    const formatLabel = row._format === 'new' ? 'new' : 'old';
    return `<div class="sample-card">
      <div class="sc-head">
        <span>Sample ${index + 1}</span>
        <div style="display:flex;gap:6px;align-items:center">
          <span style="font-size:10px;color:var(--muted)">${row.messageCount ?? '?'} msg</span>
          <span class="sc-format ${formatLabel}">${formatLabel}</span>
        </div>
      </div>
      <div class="sc-elapsed ${colorClass(row.elapsedMs, maxElapsed)}">${fmt(row.elapsedMs)} ms</div>
      <div class="sc-detail">
        RPC: <span>${fmt(row.rpcDuration)} ms</span><br>
        ${row._format === 'new' ? `Pre-RPC repo: <span>${fmt(row.preRepoBuiltAt)} ms</span><br>` : ''}
        View ready: <span>${fmt(row.coldViewAt)} ms</span><br>
        Paint wait: <span>${fmt(row.paintWaitDur)} ms</span><br>
        raf-2 wait: <span>${fmt(row.raf2WaitMs)} ms</span><br>
        ${row._hasBackend ? `BE handler: <span>${fmt(row.backend.handlerMs)} ms</span><br>outside RTT: <span>${fmt(row.backend.outsideHandlerMs)} ms</span>` : ''}
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
  clearAll();
  const textareas = document.querySelectorAll('#tracesWrapper textarea');
  if (textareas[0]) {
    textareas[0].value = JSON.stringify(EXAMPLE_TRACE, null, 2);
  }
  ensureTrailingEmptyTrace();
  [...document.querySelectorAll('#tracesWrapper textarea')].at(-1)?.focus();
  $('parseInfo').textContent = 'Loaded 1 example trace. Paste another trace to compare or analyze this sample as-is.';
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

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildComparisonRows,
    buildComparisonTextReport,
    buildBackendContextLabels,
    summarizePercentiles,
    computeStats,
    extract,
    loadMeasurementSets,
    nextSetName,
    normalizeTrace,
    persistMeasurementSets,
    selectSetForComparison,
    shouldAppendTrailingTrace,
  };
}

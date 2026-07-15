(function attachTraceModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});

  function stageFirst(stages, name) {
    return stages.find((stage) => stage.name === name) || null;
  }

  function stageLast(stages, name) {
    return [...stages].reverse().find((stage) => stage.name === name) || null;
  }

  function stagesAll(stages, name) {
    return stages.filter((stage) => stage.name === name);
  }

  function durationBetween(fromAtMs, toAtMs) {
    return Number.isFinite(fromAtMs) && Number.isFinite(toAtMs) && toAtMs >= fromAtMs
      ? toAtMs - fromAtMs
      : NaN;
  }

  function nearestStageForMessage(stages, messageId, targetAtMs) {
    if (typeof messageId !== 'string' || !messageId) return {};
    return stages
      .filter((stage) => stage.messageId === messageId)
      .reduce((nearest, stage) => {
        if (!Number.isFinite(nearest.atMs)) return stage;
        return Math.abs(stage.atMs - targetAtMs) < Math.abs(nearest.atMs - targetAtMs) ? stage : nearest;
      }, {});
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
    const postRuntimeLayout = stagesAll(postRpcStages, 'runtime-boundary-layout-commit')[0] || {};
    const postAdapterStart = stagesAll(postRpcStages, 'runtime-adapter-sync-started')[0] || {};
    const postAdapter = stagesAll(postRpcStages, 'runtime-adapter-synced')[0] || {};
    const postAdapterCutoffAt = Number.isFinite(postAdapter.atMs)
      ? postAdapter.atMs
      : Number.isFinite(postAdapterStart.atMs) ? postAdapterStart.atMs : 0;
    const transcriptStage = stageFirst(postRpcStages, 'transcript-transformed') || {};
    const coldViewAt = (stageFirst(stages, 'cold-view-published') || {}).atMs;
    const paintWaitAt = (stageFirst(stages, 'paint-wait-start') || {}).atMs;
    const raf1 = stageLast(stages, 'paint-raf-1') || {};
    const raf2 = stageLast(stages, 'paint-raf-2') || {};
    const threadLayoutAfterPaint = stages.filter(
      (stage) => stage.name === 'thread-message-list-layout-commit' && stage.atMs > (paintWaitAt || 0),
    );
    const threadLayoutAfterAdapter = threadLayoutAfterPaint.filter(
      (stage) => !Number.isFinite(postAdapter.atMs) || stage.atMs > postAdapter.atMs,
    );
    const postThreadLayout = threadLayoutAfterAdapter[0] || threadLayoutAfterPaint[0] || {};
    const postUserMessage = stages.find(
      (stage) => stage.name === 'user-message-layout-commit' && stage.atMs > postAdapterCutoffAt,
    ) || {};
    const assistantMessageCandidates = stages.filter(
      (stage) => stage.name === 'assistant-message-layout-commit' && stage.atMs > postAdapterCutoffAt,
    );
    const assistantMarkdownCandidates = stages.filter(
      (stage) => stage.name === 'assistant-markdown-layout-commit' && stage.atMs > postAdapterCutoffAt,
    );
    const postAssistantMarkdown = assistantMarkdownCandidates
      .reduce(
        (slowest, stage) =>
          !Number.isFinite(slowest.renderToLayoutCommitMs) || stage.renderToLayoutCommitMs > slowest.renderToLayoutCommitMs
            ? stage
            : slowest,
        {},
      );
    const postAssistantMessage = Number.isFinite(postAssistantMarkdown.atMs)
      ? nearestStageForMessage(
        assistantMessageCandidates,
        postAssistantMarkdown.messageId,
        postAssistantMarkdown.atMs,
      )
      : assistantMessageCandidates[0] || {};
    const paintWaitDur = Number.isFinite(postThreadLayout.atMs) && !isNaN(paintWaitAt)
      ? postThreadLayout.atMs - paintWaitAt
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
      wsEventLoopLagMs: readBackend('backendWsEventLoopLagMs'),
      wsPreviousDispatchMs: readBackend('backendWsPreviousDispatchMs'),
      wsPreviousMethod: rpcFinished.backendWsPreviousMethod ?? null,
      wsPreviousRequestFinishedAgoMs: readBackend('backendWsPreviousRequestFinishedAgoMs'),
      wsPreviousRequestMs: readBackend('backendWsPreviousRequestMs'),
      agentBuildActiveCount: readBackend('backendAgentBuildActiveCount'),
      agentBuildActiveMaxMs: readBackend('backendAgentBuildActiveMaxElapsedMs'),
      agentBuildLastDurMs: readBackend('backendAgentBuildLastDurationMs'),
      agentBuildLastAgoMs: readBackend('backendAgentBuildLastFinishedAgoMs'),
      clientReqAckMs: readBackend('clientRequestReceiveAckMs'),
      clientReqAckRendererLagMs: readBackend('clientRequestReceiveAckRendererLagMs'),
      clientReqAckTransportMs: readBackend('clientRequestReceiveAckTransportMs'),
      clientReqAckUnattributedMs: readBackend('clientRequestReceiveAckUnattributedMs'),
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
      _rendererSelectionVersion: 8,
      elapsedMs,
      profileAt,
      rpcStartAt,
      rpcDuration,
      rpcDurationMs,
      rpcFinishedAt,
      preRepoBuiltAt: preRepoBuilt.atMs,
      preAdapterAt: preAdapterSync.atMs,
      postRepoBuiltAt: postRepoBuilt.atMs,
      coldViewToRuntimeRenderMs: postRuntimeLayout.coldViewPublishToRenderStartMs,
      runtimeRenderToLayoutMs: postRuntimeLayout.renderToLayoutCommitMs,
      runtimeLayoutToAdapterSyncMs: postAdapter.layoutCommitToSyncStartMs,
      runtimeAdapterOperationMs: postAdapter.operationDurationMs,
      postAdapterStartAt: postAdapterStart.atMs,
      postAdapterAt: postAdapter.atMs,
      threadSelectedAtMs: postThreadLayout.atMs,
      assistantMessageSelectedAtMs: postAssistantMessage.atMs,
      assistantMarkdownSelectedAtMs: postAssistantMarkdown.atMs,
      assistantMessageId: postAssistantMessage.messageId ?? null,
      assistantMarkdownMessageId: postAssistantMarkdown.messageId ?? null,
      assistantMarkdownCandidateCount: assistantMarkdownCandidates.length,
      assistantMessageMatchedToMarkdown:
        Number.isFinite(postAssistantMarkdown.atMs)
        && typeof postAssistantMarkdown.messageId === 'string'
        && postAssistantMarkdown.messageId.length > 0
        && postAssistantMessage.messageId === postAssistantMarkdown.messageId,
      adapterSyncToThreadRenderMs:
        postThreadLayout.runtimeSyncStartToRenderStartMs ?? postThreadLayout.runtimeSyncToRenderStartMs,
      adapterSyncToThreadLayoutMs: durationBetween(postAdapter.atMs, postThreadLayout.atMs),
      threadRenderBodyMs: postThreadLayout.renderBodyDurationMs,
      threadAfterBodyToInsertionMs:
        Number.isFinite(postThreadLayout.renderToInsertionCommitMs) && Number.isFinite(postThreadLayout.renderBodyDurationMs)
          ? Math.max(0, postThreadLayout.renderToInsertionCommitMs - postThreadLayout.renderBodyDurationMs)
          : NaN,
      threadInsertionToLayoutMs: postThreadLayout.insertionCommitToLayoutMs,
      threadRenderToLayoutMs: postThreadLayout.renderToLayoutCommitMs,
      userMessageRenderBodyMs: postUserMessage.renderBodyDurationMs,
      assistantMessageRenderBodyMs: postAssistantMessage.renderBodyDurationMs,
      assistantMessageAfterBodyToInsertionMs:
        Number.isFinite(postAssistantMessage.renderToInsertionCommitMs) && Number.isFinite(postAssistantMessage.renderBodyDurationMs)
          ? Math.max(0, postAssistantMessage.renderToInsertionCommitMs - postAssistantMessage.renderBodyDurationMs)
          : NaN,
      assistantMessageInsertionToLayoutMs: postAssistantMessage.insertionCommitToLayoutMs,
      assistantMessageRenderToLayoutMs: postAssistantMessage.renderToLayoutCommitMs,
      assistantLayoutToMarkdownLayoutMs: durationBetween(postAssistantMessage.atMs, postAssistantMarkdown.atMs),
      adapterSyncToMarkdownLayoutMs: durationBetween(postAdapter.atMs, postAssistantMarkdown.atMs),
      threadLayoutToMarkdownLayoutMs: durationBetween(postThreadLayout.atMs, postAssistantMarkdown.atMs),
      assistantMarkdownRenderBodyMs: postAssistantMarkdown.renderBodyDurationMs,
      assistantMarkdownAfterBodyToInsertionMs:
        Number.isFinite(postAssistantMarkdown.renderToInsertionCommitMs) && Number.isFinite(postAssistantMarkdown.renderBodyDurationMs)
          ? Math.max(0, postAssistantMarkdown.renderToInsertionCommitMs - postAssistantMarkdown.renderBodyDurationMs)
          : NaN,
      assistantMarkdownInsertionToLayoutMs: postAssistantMarkdown.insertionCommitToLayoutMs,
      assistantMarkdownRenderToLayoutMs: postAssistantMarkdown.renderToLayoutCommitMs,
      transcriptMs: transcriptStage.sincePreviousStageMs,
      coldViewAt,
      paintWaitAt,
      paintWaitDur,
      resumeRespAt: resumeResponseSent.atMs,
      raf1At: raf1.atMs,
      raf2At: raf2.atMs,
      markdownLayoutToRaf1Ms: durationBetween(postAssistantMarkdown.atMs, raf1.atMs),
      raf1ToRaf2Ms: durationBetween(raf1.atMs, raf2.atMs),
      raf2WaitMs: raf2.waitDurationMs,
      messageCount: rpcFinished.messageCount ?? trace.messageCount,
      backend,
    };
  }

  const traceModule = {
    extract,
    normalizeTrace,
  };

  Object.assign(HermesPerfAnalyzer, traceModule);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = traceModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

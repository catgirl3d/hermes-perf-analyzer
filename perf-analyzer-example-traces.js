window.HERMES_PERF_EXAMPLE_TRACES = `
{
  "elapsedMs": 441,
  "outcome": "cold-resumed",
  "requestId": 2,
  "session": "20260…02c54e",
  "stages": [
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0.1,
      "name": "initial-cache",
      "warm": false
    },
    {
      "atMs": 0.2,
      "sincePreviousStageMs": 0.1,
      "name": "profile-resolve-start",
      "sessionWasInSidebar": true
    },
    {
      "atMs": 10.5,
      "sincePreviousStageMs": 10.3,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0,
      "coalescedCount": 14,
      "headIdPresent": true,
      "messageCount": 14,
      "repositoryVisibleMessageCount": 14
    },
    {
      "atMs": 51.7,
      "sincePreviousStageMs": 41.2,
      "name": "thread-message-list-layout-commit",
      "groupCount": 7,
      "hiddenGroupCount": 6,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 52.4,
      "sincePreviousStageMs": 0.7,
      "name": "desktop-layout-commit",
      "routeSessionMatch": true,
      "routedSession": true
    },
    {
      "atMs": 53.7,
      "sincePreviousStageMs": 1.3,
      "name": "runtime-adapter-synced",
      "messageCount": 14,
      "operationDurationMs": 0.3
    },
    {
      "atMs": 58.3,
      "sincePreviousStageMs": 4.6,
      "name": "profile-resolve-finished",
      "profileResolved": true,
      "sessionWasInSidebar": true
    },
    {
      "atMs": 58.3,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-start",
      "profileSwitch": false
    },
    {
      "atMs": 58.3,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-finished",
      "profileSwitch": false
    },
    {
      "atMs": 58.5,
      "sincePreviousStageMs": 0.2,
      "name": "resume-rpc-start"
    },
    {
      "atMs": 137.4,
      "sincePreviousStageMs": 78.9,
      "name": "resume-rpc-finished",
      "backendAgentBuildActiveCount": 0,
      "backendAgentBuildLastDurationMs": 3513.79,
      "backendAgentBuildLastFinishedAgoMs": 4730.23,
      "backendDbOpenMs": 1.14,
      "backendDispatchQueueMs": 0.13,
      "backendEventLoopQueueMs": 0.24,
      "backendHandlerMs": 6.84,
      "backendHandlerToWriteMs": 0.02,
      "backendHistoryReadMs": 0.61,
      "backendJsonSerializeMs": 0.16,
      "backendLiveLookupMs": 0.02,
      "backendLiveRegisterMs": 0.05,
      "backendMessageTransportMs": 0.05,
      "backendPromptSetupMs": 0.09,
      "backendRecordPrepareMs": 2.36,
      "backendReopenMs": 0.15,
      "backendResumeInfoMs": 1.03,
      "backendResumePrewarmEnabled": 1,
      "backendResumePrewarmMode": "immediate",
      "backendSessionLookupMs": 0.26,
      "backendSlotClaimMs": 0.93,
      "backendTimingVersion": 10,
      "backendTipResolveMs": 0.15,
      "backendWsAckSendMs": 0.27,
      "backendWsReceiveToAckMs": 0.02,
      "clientJsonParseMs": 0.3,
      "clientMessageEventQueueMs": 0.1,
      "clientReceiveAckEventQueueMs": 0,
      "clientReceiveAckToResponseMs": 1.4,
      "clientRequestReceiveAckMs": 76.9,
      "clientRequestReceiveAckTransportMs": 76.9,
      "clientRequestSendMs": 0.1,
      "clientResponseChars": 10563,
      "outsideHandlerRoundTripMs": 71.8,
      "unmeasuredRoundTripMs": 70.5,
      "messageCount": 16,
      "rpcDurationMs": 78.6
    },
    {
      "atMs": 138.1,
      "sincePreviousStageMs": 0.7,
      "name": "transcript-transformed",
      "transformDurationMs": 0.7,
      "messageCount": 16
    },
    {
      "atMs": 138.6,
      "sincePreviousStageMs": 0.5,
      "name": "cold-view-published",
      "messageCount": 16
    },
    {
      "atMs": 138.7,
      "sincePreviousStageMs": 0.1,
      "name": "paint-wait-start",
      "rafCount": 2,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 154.7,
      "sincePreviousStageMs": 16,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.5,
      "coalescedCount": 16,
      "headIdPresent": true,
      "messageCount": 16,
      "repositoryVisibleMessageCount": 16
    },
    {
      "atMs": 251.7,
      "sincePreviousStageMs": 97,
      "name": "runtime-adapter-synced",
      "messageCount": 16,
      "operationDurationMs": 2
    },
    {
      "atMs": 382.2,
      "sincePreviousStageMs": 130.5,
      "name": "thread-message-list-layout-commit",
      "groupCount": 8,
      "hiddenGroupCount": 7,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 430.9,
      "sincePreviousStageMs": 48.7,
      "name": "paint-raf-1",
      "waitDurationMs": 292.2,
      "rafCount": 1,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 435.7,
      "sincePreviousStageMs": 4.8,
      "name": "resume-response-sent",
      "backendJsonSerializeMs": 0.16,
      "backendPrefixFrameCount": 0,
      "backendPrefixSendMs": 0,
      "backendResponseSendMs": 1.03,
      "backendSendTotalMs": 1.04
    },
    {
      "atMs": 440.9,
      "sincePreviousStageMs": 5.2,
      "name": "paint-raf-2",
      "waitDurationMs": 302.2,
      "rafCount": 2,
      "waitMethod": "double-raf"
    }
  ],
  "messageCount": 16,
  "profileSwitch": false
}

--

{
  "elapsedMs": 433.3,
  "outcome": "cold-resumed",
  "requestId": 2,
  "session": "20260…02c54e",
  "stages": [
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0.1,
      "name": "initial-cache",
      "warm": false
    },
    {
      "atMs": 0.2,
      "sincePreviousStageMs": 0.1,
      "name": "profile-resolve-start",
      "sessionWasInSidebar": true
    },
    {
      "atMs": 9.6,
      "sincePreviousStageMs": 9.4,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0,
      "coalescedCount": 14,
      "headIdPresent": true,
      "messageCount": 14,
      "repositoryVisibleMessageCount": 14
    },
    {
      "atMs": 54.5,
      "sincePreviousStageMs": 44.9,
      "name": "thread-message-list-layout-commit",
      "groupCount": 7,
      "hiddenGroupCount": 6,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 55,
      "sincePreviousStageMs": 0.5,
      "name": "desktop-layout-commit",
      "routeSessionMatch": true,
      "routedSession": true
    },
    {
      "atMs": 55.8,
      "sincePreviousStageMs": 0.8,
      "name": "runtime-adapter-synced",
      "messageCount": 14,
      "operationDurationMs": 0.2
    },
    {
      "atMs": 57.7,
      "sincePreviousStageMs": 1.9,
      "name": "profile-resolve-finished",
      "profileResolved": true,
      "sessionWasInSidebar": true
    },
    {
      "atMs": 57.7,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-start",
      "profileSwitch": false
    },
    {
      "atMs": 57.8,
      "sincePreviousStageMs": 0.1,
      "name": "gateway-profile-finished",
      "profileSwitch": false
    },
    {
      "atMs": 57.8,
      "sincePreviousStageMs": 0,
      "name": "resume-rpc-start"
    },
    {
      "atMs": 193.3,
      "sincePreviousStageMs": 135.5,
      "name": "resume-rpc-finished",
      "backendAgentBuildActiveCount": 0,
      "backendAgentBuildLastDurationMs": 3588.28,
      "backendAgentBuildLastFinishedAgoMs": 3616.59,
      "backendDbOpenMs": 0.8,
      "backendDispatchQueueMs": 0.09,
      "backendEventLoopQueueMs": 0.24,
      "backendHandlerMs": 5.14,
      "backendHandlerToWriteMs": 0.02,
      "backendHistoryReadMs": 0.44,
      "backendJsonSerializeMs": 0.15,
      "backendLiveLookupMs": 0.04,
      "backendLiveRegisterMs": 0.03,
      "backendMessageTransportMs": 0.02,
      "backendPromptSetupMs": 0.11,
      "backendRecordPrepareMs": 1.21,
      "backendReopenMs": 0.2,
      "backendResumeInfoMs": 1,
      "backendResumePrewarmEnabled": 1,
      "backendResumePrewarmMode": "immediate",
      "backendSessionLookupMs": 0.2,
      "backendSlotClaimMs": 0.92,
      "backendTimingVersion": 10,
      "backendTipResolveMs": 0.16,
      "backendWsAckSendMs": 0.25,
      "backendWsReceiveToAckMs": 0.02,
      "clientJsonParseMs": 0.2,
      "clientMessageEventQueueMs": 0,
      "clientReceiveAckEventQueueMs": 0,
      "clientReceiveAckToResponseMs": 8.1,
      "clientRequestReceiveAckMs": 126.7,
      "clientRequestReceiveAckTransportMs": 126.7,
      "clientRequestSendMs": 0.1,
      "clientResponseChars": 10558,
      "outsideHandlerRoundTripMs": 130.1,
      "unmeasuredRoundTripMs": 129,
      "messageCount": 16,
      "rpcDurationMs": 135.2
    },
    {
      "atMs": 193.5,
      "sincePreviousStageMs": 0.2,
      "name": "transcript-transformed",
      "transformDurationMs": 0.2,
      "messageCount": 16
    },
    {
      "atMs": 193.9,
      "sincePreviousStageMs": 0.4,
      "name": "cold-view-published",
      "messageCount": 16
    },
    {
      "atMs": 193.9,
      "sincePreviousStageMs": 0,
      "name": "paint-wait-start",
      "rafCount": 2,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 207,
      "sincePreviousStageMs": 13.1,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.2,
      "coalescedCount": 16,
      "headIdPresent": true,
      "messageCount": 16,
      "repositoryVisibleMessageCount": 16
    },
    {
      "atMs": 296.1,
      "sincePreviousStageMs": 89.1,
      "name": "runtime-adapter-synced",
      "messageCount": 16,
      "operationDurationMs": 3.5
    },
    {
      "atMs": 406.4,
      "sincePreviousStageMs": 110.3,
      "name": "thread-message-list-layout-commit",
      "groupCount": 8,
      "hiddenGroupCount": 7,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 419.2,
      "sincePreviousStageMs": 12.8,
      "name": "paint-raf-1",
      "waitDurationMs": 225.3,
      "rafCount": 1,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 427.5,
      "sincePreviousStageMs": 8.3,
      "name": "resume-response-sent",
      "backendJsonSerializeMs": 0.15,
      "backendPrefixFrameCount": 0,
      "backendPrefixSendMs": 0,
      "backendResponseSendMs": 1.11,
      "backendSendTotalMs": 1.12
    },
    {
      "atMs": 433.3,
      "sincePreviousStageMs": 5.8,
      "name": "paint-raf-2",
      "waitDurationMs": 239.4,
      "rafCount": 2,
      "waitMethod": "double-raf"
    }
  ],
  "messageCount": 16,
  "profileSwitch": false
}

--

{
  "elapsedMs": 531.1,
  "outcome": "cold-resumed",
  "requestId": 2,
  "session": "20260…02c54e",
  "stages": [
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0.1,
      "name": "initial-cache",
      "warm": false
    },
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0,
      "name": "profile-resolve-start",
      "sessionWasInSidebar": true
    },
    {
      "atMs": 12.4,
      "sincePreviousStageMs": 12.3,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.1,
      "coalescedCount": 14,
      "headIdPresent": true,
      "messageCount": 14,
      "repositoryVisibleMessageCount": 14
    },
    {
      "atMs": 70.1,
      "sincePreviousStageMs": 57.7,
      "name": "thread-message-list-layout-commit",
      "groupCount": 7,
      "hiddenGroupCount": 6,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 70.5,
      "sincePreviousStageMs": 0.4,
      "name": "desktop-layout-commit",
      "routeSessionMatch": true,
      "routedSession": true
    },
    {
      "atMs": 71.4,
      "sincePreviousStageMs": 0.9,
      "name": "runtime-adapter-synced",
      "messageCount": 14,
      "operationDurationMs": 0.3
    },
    {
      "atMs": 74.6,
      "sincePreviousStageMs": 3.2,
      "name": "profile-resolve-finished",
      "profileResolved": true,
      "sessionWasInSidebar": true
    },
    {
      "atMs": 74.6,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-start",
      "profileSwitch": false
    },
    {
      "atMs": 74.7,
      "sincePreviousStageMs": 0.1,
      "name": "gateway-profile-finished",
      "profileSwitch": false
    },
    {
      "atMs": 74.7,
      "sincePreviousStageMs": 0,
      "name": "resume-rpc-start"
    },
    {
      "atMs": 179.5,
      "sincePreviousStageMs": 104.8,
      "name": "resume-rpc-finished",
      "backendAgentBuildActiveCount": 0,
      "backendAgentBuildLastDurationMs": 3381.87,
      "backendAgentBuildLastFinishedAgoMs": 1491.85,
      "backendDbOpenMs": 1.19,
      "backendDispatchQueueMs": 0.13,
      "backendEventLoopQueueMs": 0.25,
      "backendHandlerMs": 6.69,
      "backendHandlerToWriteMs": 0.01,
      "backendHistoryReadMs": 0.64,
      "backendJsonSerializeMs": 0.13,
      "backendLiveLookupMs": 0.02,
      "backendLiveRegisterMs": 0.05,
      "backendMessageTransportMs": 0.05,
      "backendPromptSetupMs": 0.1,
      "backendRecordPrepareMs": 2.35,
      "backendReopenMs": 0.18,
      "backendResumeInfoMs": 0.84,
      "backendResumePrewarmEnabled": 1,
      "backendResumePrewarmMode": "immediate",
      "backendSessionLookupMs": 0.22,
      "backendSlotClaimMs": 0.87,
      "backendTimingVersion": 10,
      "backendTipResolveMs": 0.17,
      "backendWsAckSendMs": 0.3,
      "backendWsReceiveToAckMs": 0.03,
      "clientJsonParseMs": 0.2,
      "clientMessageEventQueueMs": 0.2,
      "clientReceiveAckEventQueueMs": 0,
      "clientReceiveAckToResponseMs": 2.9,
      "clientRequestReceiveAckMs": 101.6,
      "clientRequestReceiveAckTransportMs": 101.6,
      "clientRequestSendMs": 0.1,
      "clientResponseChars": 10561,
      "outsideHandlerRoundTripMs": 98,
      "unmeasuredRoundTripMs": 96.7,
      "messageCount": 16,
      "rpcDurationMs": 104.7
    },
    {
      "atMs": 179.8,
      "sincePreviousStageMs": 0.3,
      "name": "transcript-transformed",
      "transformDurationMs": 0.3,
      "messageCount": 16
    },
    {
      "atMs": 180.2,
      "sincePreviousStageMs": 0.4,
      "name": "cold-view-published",
      "messageCount": 16
    },
    {
      "atMs": 180.2,
      "sincePreviousStageMs": 0,
      "name": "paint-wait-start",
      "rafCount": 2,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 197.9,
      "sincePreviousStageMs": 17.7,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.3,
      "coalescedCount": 16,
      "headIdPresent": true,
      "messageCount": 16,
      "repositoryVisibleMessageCount": 16
    },
    {
      "atMs": 309.7,
      "sincePreviousStageMs": 111.8,
      "name": "runtime-adapter-synced",
      "messageCount": 16,
      "operationDurationMs": 5
    },
    {
      "atMs": 441.2,
      "sincePreviousStageMs": 131.5,
      "name": "thread-message-list-layout-commit",
      "groupCount": 8,
      "hiddenGroupCount": 7,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 519.6,
      "sincePreviousStageMs": 78.4,
      "name": "paint-raf-1",
      "waitDurationMs": 339.4,
      "rafCount": 1,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 526.9,
      "sincePreviousStageMs": 7.3,
      "name": "resume-response-sent",
      "backendJsonSerializeMs": 0.13,
      "backendPrefixFrameCount": 0,
      "backendPrefixSendMs": 0,
      "backendResponseSendMs": 1.16,
      "backendSendTotalMs": 1.17
    },
    {
      "atMs": 531.1,
      "sincePreviousStageMs": 4.2,
      "name": "paint-raf-2",
      "waitDurationMs": 350.8,
      "rafCount": 2,
      "waitMethod": "double-raf"
    }
  ],
  "messageCount": 16,
  "profileSwitch": false
}

--

{
  "elapsedMs": 408.8,
  "outcome": "cold-resumed",
  "requestId": 2,
  "session": "20260…02c54e",
  "stages": [
    {
      "atMs": 0,
      "sincePreviousStageMs": 0,
      "name": "initial-cache",
      "warm": false
    },
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0.1,
      "name": "profile-resolve-start",
      "sessionWasInSidebar": true
    },
    {
      "atMs": 14.8,
      "sincePreviousStageMs": 14.7,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.2,
      "coalescedCount": 14,
      "headIdPresent": true,
      "messageCount": 14,
      "repositoryVisibleMessageCount": 14
    },
    {
      "atMs": 66.8,
      "sincePreviousStageMs": 52,
      "name": "thread-message-list-layout-commit",
      "groupCount": 7,
      "hiddenGroupCount": 6,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 67.2,
      "sincePreviousStageMs": 0.4,
      "name": "desktop-layout-commit",
      "routeSessionMatch": true,
      "routedSession": true
    },
    {
      "atMs": 67.9,
      "sincePreviousStageMs": 0.7,
      "name": "runtime-adapter-synced",
      "messageCount": 14,
      "operationDurationMs": 0.2
    },
    {
      "atMs": 69.3,
      "sincePreviousStageMs": 1.4,
      "name": "profile-resolve-finished",
      "profileResolved": true,
      "sessionWasInSidebar": true
    },
    {
      "atMs": 69.3,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-start",
      "profileSwitch": false
    },
    {
      "atMs": 69.3,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-finished",
      "profileSwitch": false
    },
    {
      "atMs": 69.3,
      "sincePreviousStageMs": 0,
      "name": "resume-rpc-start"
    },
    {
      "atMs": 138.1,
      "sincePreviousStageMs": 68.8,
      "name": "resume-rpc-finished",
      "backendAgentBuildActiveCount": 1,
      "backendAgentBuildActiveMaxElapsedMs": 2480.43,
      "backendDbOpenMs": 0.82,
      "backendDispatchQueueMs": 0.11,
      "backendEventLoopQueueMs": 0.19,
      "backendHandlerMs": 5.58,
      "backendHandlerToWriteMs": 0.02,
      "backendHistoryReadMs": 0.64,
      "backendJsonSerializeMs": 0.09,
      "backendLiveLookupMs": 0.01,
      "backendLiveRegisterMs": 0.04,
      "backendMessageTransportMs": 0.04,
      "backendPromptSetupMs": 0.06,
      "backendRecordPrepareMs": 2.23,
      "backendReopenMs": 0.1,
      "backendResumeInfoMs": 0.96,
      "backendResumePrewarmEnabled": 1,
      "backendResumePrewarmMode": "immediate",
      "backendSessionLookupMs": 0.17,
      "backendSlotClaimMs": 0.42,
      "backendTimingVersion": 10,
      "backendTipResolveMs": 0.09,
      "backendWsAckSendMs": 0.22,
      "backendWsReceiveToAckMs": 0.04,
      "clientJsonParseMs": 0,
      "clientMessageEventQueueMs": 0.1,
      "clientReceiveAckEventQueueMs": 0,
      "clientReceiveAckToResponseMs": 3.2,
      "clientRequestReceiveAckMs": 65.2,
      "clientRequestReceiveAckTransportMs": 65.2,
      "clientRequestSendMs": 0,
      "clientResponseChars": 10562,
      "outsideHandlerRoundTripMs": 62.8,
      "unmeasuredRoundTripMs": 62,
      "messageCount": 16,
      "rpcDurationMs": 68.4
    },
    {
      "atMs": 138.5,
      "sincePreviousStageMs": 0.4,
      "name": "transcript-transformed",
      "transformDurationMs": 0.4,
      "messageCount": 16
    },
    {
      "atMs": 138.7,
      "sincePreviousStageMs": 0.2,
      "name": "cold-view-published",
      "messageCount": 16
    },
    {
      "atMs": 138.7,
      "sincePreviousStageMs": 0,
      "name": "paint-wait-start",
      "rafCount": 2,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 151.5,
      "sincePreviousStageMs": 12.8,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.2,
      "coalescedCount": 16,
      "headIdPresent": true,
      "messageCount": 16,
      "repositoryVisibleMessageCount": 16
    },
    {
      "atMs": 226,
      "sincePreviousStageMs": 74.5,
      "name": "runtime-adapter-synced",
      "messageCount": 16,
      "operationDurationMs": 2.1
    },
    {
      "atMs": 333.1,
      "sincePreviousStageMs": 107.1,
      "name": "thread-message-list-layout-commit",
      "groupCount": 8,
      "hiddenGroupCount": 7,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 398,
      "sincePreviousStageMs": 64.9,
      "name": "paint-raf-1",
      "waitDurationMs": 259.2,
      "rafCount": 1,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 403.8,
      "sincePreviousStageMs": 5.8,
      "name": "resume-response-sent",
      "backendJsonSerializeMs": 0.09,
      "backendPrefixFrameCount": 0,
      "backendPrefixSendMs": 0,
      "backendResponseSendMs": 0.98,
      "backendSendTotalMs": 0.98
    },
    {
      "atMs": 408.8,
      "sincePreviousStageMs": 5,
      "name": "paint-raf-2",
      "waitDurationMs": 270.1,
      "rafCount": 2,
      "waitMethod": "double-raf"
    }
  ],
  "messageCount": 16,
  "profileSwitch": false
}

--

{
  "elapsedMs": 390.3,
  "outcome": "cold-resumed",
  "requestId": 2,
  "session": "20260…02c54e",
  "stages": [
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0.1,
      "name": "initial-cache",
      "warm": false
    },
    {
      "atMs": 0.1,
      "sincePreviousStageMs": 0,
      "name": "profile-resolve-start",
      "sessionWasInSidebar": true
    },
    {
      "atMs": 9.2,
      "sincePreviousStageMs": 9.1,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0,
      "coalescedCount": 14,
      "headIdPresent": true,
      "messageCount": 14,
      "repositoryVisibleMessageCount": 14
    },
    {
      "atMs": 45.4,
      "sincePreviousStageMs": 36.2,
      "name": "thread-message-list-layout-commit",
      "groupCount": 7,
      "hiddenGroupCount": 6,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 45.9,
      "sincePreviousStageMs": 0.5,
      "name": "desktop-layout-commit",
      "routeSessionMatch": true,
      "routedSession": true
    },
    {
      "atMs": 46.6,
      "sincePreviousStageMs": 0.7,
      "name": "runtime-adapter-synced",
      "messageCount": 14,
      "operationDurationMs": 0.3
    },
    {
      "atMs": 48,
      "sincePreviousStageMs": 1.4,
      "name": "profile-resolve-finished",
      "profileResolved": true,
      "sessionWasInSidebar": true
    },
    {
      "atMs": 48,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-start",
      "profileSwitch": false
    },
    {
      "atMs": 48,
      "sincePreviousStageMs": 0,
      "name": "gateway-profile-finished",
      "profileSwitch": false
    },
    {
      "atMs": 48.1,
      "sincePreviousStageMs": 0.1,
      "name": "resume-rpc-start"
    },
    {
      "atMs": 150,
      "sincePreviousStageMs": 101.9,
      "name": "resume-rpc-finished",
      "backendAgentBuildActiveCount": 1,
      "backendAgentBuildActiveMaxElapsedMs": 4354.63,
      "backendDbOpenMs": 1.71,
      "backendDispatchQueueMs": 0.18,
      "backendEventLoopQueueMs": 0.37,
      "backendHandlerMs": 10.17,
      "backendHandlerToWriteMs": 0.03,
      "backendHistoryReadMs": 0.85,
      "backendJsonSerializeMs": 0.09,
      "backendLiveLookupMs": 0.02,
      "backendLiveRegisterMs": 0.02,
      "backendMessageTransportMs": 0.02,
      "backendPromptSetupMs": 0.09,
      "backendRecordPrepareMs": 1.44,
      "backendReopenMs": 0.79,
      "backendResumeInfoMs": 2.5,
      "backendResumePrewarmEnabled": 1,
      "backendResumePrewarmMode": "immediate",
      "backendSessionLookupMs": 0.35,
      "backendSlotClaimMs": 0.93,
      "backendTimingVersion": 10,
      "backendTipResolveMs": 1.44,
      "backendWsAckSendMs": 0.15,
      "backendWsReceiveToAckMs": 0.01,
      "clientJsonParseMs": 0,
      "clientMessageEventQueueMs": 0.2,
      "clientReceiveAckEventQueueMs": 0,
      "clientReceiveAckToResponseMs": 1.7,
      "clientRequestReceiveAckMs": 99.8,
      "clientRequestReceiveAckTransportMs": 99.8,
      "clientRequestSendMs": 0.1,
      "clientResponseChars": 10563,
      "outsideHandlerRoundTripMs": 91.4,
      "unmeasuredRoundTripMs": 90.3,
      "messageCount": 16,
      "rpcDurationMs": 101.6
    },
    {
      "atMs": 150.2,
      "sincePreviousStageMs": 0.2,
      "name": "transcript-transformed",
      "transformDurationMs": 0.2,
      "messageCount": 16
    },
    {
      "atMs": 150.4,
      "sincePreviousStageMs": 0.2,
      "name": "cold-view-published",
      "messageCount": 16
    },
    {
      "atMs": 150.4,
      "sincePreviousStageMs": 0,
      "name": "paint-wait-start",
      "rafCount": 2,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 164.1,
      "sincePreviousStageMs": 13.7,
      "name": "runtime-message-repository-built",
      "operationDurationMs": 0.2,
      "coalescedCount": 16,
      "headIdPresent": true,
      "messageCount": 16,
      "repositoryVisibleMessageCount": 16
    },
    {
      "atMs": 249,
      "sincePreviousStageMs": 84.9,
      "name": "runtime-adapter-synced",
      "messageCount": 16,
      "operationDurationMs": 1.6
    },
    {
      "atMs": 333.5,
      "sincePreviousStageMs": 84.5,
      "name": "thread-message-list-layout-commit",
      "groupCount": 8,
      "hiddenGroupCount": 7,
      "mountedMessageCount": 2,
      "visibleGroupCount": 1
    },
    {
      "atMs": 374.2,
      "sincePreviousStageMs": 40.7,
      "name": "paint-raf-1",
      "waitDurationMs": 223.8,
      "rafCount": 1,
      "waitMethod": "double-raf"
    },
    {
      "atMs": 379.6,
      "sincePreviousStageMs": 5.4,
      "name": "resume-response-sent",
      "backendJsonSerializeMs": 0.09,
      "backendPrefixFrameCount": 0,
      "backendPrefixSendMs": 0,
      "backendResponseSendMs": 1.43,
      "backendSendTotalMs": 1.43
    },
    {
      "atMs": 390.2,
      "sincePreviousStageMs": 10.6,
      "name": "paint-raf-2",
      "waitDurationMs": 239.8,
      "rafCount": 2,
      "waitMethod": "double-raf"
    }
  ],
  "messageCount": 16,
  "profileSwitch": false
}
`
  .split(/\n--\n/g)
  .map((block) => block.trim())
  .filter(Boolean)
  .map((block) => JSON.parse(block));

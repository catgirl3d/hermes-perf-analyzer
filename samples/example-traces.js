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

--
{
    "elapsedMs": 508.6,
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
            "atMs": 16.5,
            "sincePreviousStageMs": 16.4,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 2,
            "headIdPresent": true,
            "messageCount": 2,
            "repositoryVisibleMessageCount": 2
        },
        {
            "atMs": 66.2,
            "sincePreviousStageMs": 49.7,
            "name": "thread-message-list-layout-commit",
            "groupCount": 1,
            "hiddenGroupCount": 0,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 67,
            "sincePreviousStageMs": 0.8,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 68,
            "sincePreviousStageMs": 1,
            "name": "runtime-adapter-synced",
            "messageCount": 2,
            "operationDurationMs": 0.3
        },
        {
            "atMs": 70.9,
            "sincePreviousStageMs": 2.9,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 71,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 71.1,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 71.1,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 150,
            "sincePreviousStageMs": 78.9,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 3704.43,
            "backendAgentBuildLastFinishedAgoMs": 7053.72,
            "backendDbOpenMs": 0.8,
            "backendDispatchQueueMs": 0.11,
            "backendEventLoopQueueMs": 0.19,
            "backendHandlerMs": 4.86,
            "backendHandlerToWriteMs": 0.01,
            "backendHistoryReadMs": 0.41,
            "backendJsonSerializeMs": 0.09,
            "backendLiveLookupMs": 0.02,
            "backendLiveRegisterMs": 0.03,
            "backendMessageTransportMs": 0.02,
            "backendPromptSetupMs": 0.06,
            "backendRecordPrepareMs": 1.12,
            "backendReopenMs": 0.13,
            "backendResumeInfoMs": 0.67,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.25,
            "backendSlotClaimMs": 1.16,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.19,
            "backendWsAckSendMs": 0.19,
            "backendWsReceiveToAckMs": 0.02,
            "clientJsonParseMs": 0.2,
            "clientMessageEventQueueMs": 0.1,
            "clientReceiveAckEventQueueMs": 0.1,
            "clientReceiveAckToResponseMs": 3.4,
            "clientRequestReceiveAckMs": 75,
            "clientRequestReceiveAckTransportMs": 74.9,
            "clientRequestSendMs": 0,
            "clientResponseChars": 10525,
            "outsideHandlerRoundTripMs": 73.7,
            "unmeasuredRoundTripMs": 72.8,
            "messageCount": 16,
            "rpcDurationMs": 78.6
        },
        {
            "atMs": 150.5,
            "sincePreviousStageMs": 0.5,
            "name": "transcript-transformed",
            "transformDurationMs": 0.4,
            "messageCount": 16
        },
        {
            "atMs": 150.8,
            "sincePreviousStageMs": 0.3,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 150.8,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 173.2,
            "sincePreviousStageMs": 22.4,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.6,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 275.3,
            "sincePreviousStageMs": 102.1,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 0.9
        },
        {
            "atMs": 429.8,
            "sincePreviousStageMs": 154.5,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 494.8,
            "sincePreviousStageMs": 65,
            "name": "paint-raf-1",
            "waitDurationMs": 344,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 504.1,
            "sincePreviousStageMs": 9.3,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.09,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 0.89,
            "backendSendTotalMs": 0.89
        },
        {
            "atMs": 508.6,
            "sincePreviousStageMs": 4.5,
            "name": "paint-raf-2",
            "waitDurationMs": 357.8,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 381.6,
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
            "atMs": 0,
            "sincePreviousStageMs": 0,
            "name": "profile-resolve-start",
            "sessionWasInSidebar": true
        },
        {
            "atMs": 8.4,
            "sincePreviousStageMs": 8.4,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 40.3,
            "sincePreviousStageMs": 31.9,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 40.6,
            "sincePreviousStageMs": 0.3,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 41.3,
            "sincePreviousStageMs": 0.7,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.3
        },
        {
            "atMs": 42.6,
            "sincePreviousStageMs": 1.3,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 42.6,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 42.6,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 42.6,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 139.2,
            "sincePreviousStageMs": 96.6,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 4006.49,
            "backendAgentBuildLastFinishedAgoMs": 6374.68,
            "backendDbOpenMs": 1.48,
            "backendDispatchQueueMs": 0.16,
            "backendEventLoopQueueMs": 0.18,
            "backendHandlerMs": 4.75,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.38,
            "backendJsonSerializeMs": 0.09,
            "backendLiveLookupMs": 0.01,
            "backendLiveRegisterMs": 0.03,
            "backendMessageTransportMs": 0.02,
            "backendPromptSetupMs": 0.06,
            "backendRecordPrepareMs": 1.19,
            "backendReopenMs": 0.12,
            "backendResumeInfoMs": 0.66,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.22,
            "backendSlotClaimMs": 0.46,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.11,
            "backendWsAckSendMs": 0.28,
            "backendWsReceiveToAckMs": 0.02,
            "clientJsonParseMs": 0.1,
            "clientMessageEventQueueMs": 0,
            "clientReceiveAckEventQueueMs": 0,
            "clientReceiveAckToResponseMs": 6.8,
            "clientRequestReceiveAckMs": 89.6,
            "clientRequestReceiveAckTransportMs": 89.6,
            "clientRequestSendMs": 0,
            "clientResponseChars": 10526,
            "outsideHandlerRoundTripMs": 91.8,
            "unmeasuredRoundTripMs": 91,
            "messageCount": 16,
            "rpcDurationMs": 96.5
        },
        {
            "atMs": 139.5,
            "sincePreviousStageMs": 0.3,
            "name": "transcript-transformed",
            "transformDurationMs": 0.2,
            "messageCount": 16
        },
        {
            "atMs": 139.8,
            "sincePreviousStageMs": 0.3,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 139.8,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 153.6,
            "sincePreviousStageMs": 13.8,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 224,
            "sincePreviousStageMs": 70.4,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 1.8
        },
        {
            "atMs": 333.3,
            "sincePreviousStageMs": 109.3,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 366.8,
            "sincePreviousStageMs": 33.5,
            "name": "paint-raf-1",
            "waitDurationMs": 226.9,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 375.5,
            "sincePreviousStageMs": 8.7,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.09,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 0.81,
            "backendSendTotalMs": 0.81
        },
        {
            "atMs": 381.5,
            "sincePreviousStageMs": 6,
            "name": "paint-raf-2",
            "waitDurationMs": 241.7,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 455.5,
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
            "atMs": 0,
            "sincePreviousStageMs": 0,
            "name": "profile-resolve-start",
            "sessionWasInSidebar": true
        },
        {
            "atMs": 11.1,
            "sincePreviousStageMs": 11.1,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 53.2,
            "sincePreviousStageMs": 42.1,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 53.7,
            "sincePreviousStageMs": 0.5,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 54.4,
            "sincePreviousStageMs": 0.7,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.2
        },
        {
            "atMs": 55.8,
            "sincePreviousStageMs": 1.4,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 55.8,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 55.9,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 55.9,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 157.2,
            "sincePreviousStageMs": 101.3,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 4254.54,
            "backendAgentBuildLastFinishedAgoMs": 5240.22,
            "backendDbOpenMs": 0.87,
            "backendDispatchQueueMs": 0.17,
            "backendEventLoopQueueMs": 0.2,
            "backendHandlerMs": 4.51,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.47,
            "backendJsonSerializeMs": 0.1,
            "backendLiveLookupMs": 0.01,
            "backendLiveRegisterMs": 0.03,
            "backendMessageTransportMs": 0.02,
            "backendPromptSetupMs": 0.07,
            "backendRecordPrepareMs": 1.24,
            "backendReopenMs": 0.19,
            "backendResumeInfoMs": 0.69,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.2,
            "backendSlotClaimMs": 0.59,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.11,
            "backendWsAckSendMs": 0.51,
            "backendWsReceiveToAckMs": 0.03,
            "clientJsonParseMs": 0.2,
            "clientMessageEventQueueMs": 0.1,
            "clientReceiveAckEventQueueMs": 0,
            "clientReceiveAckToResponseMs": 5.7,
            "clientRequestReceiveAckMs": 95.3,
            "clientRequestReceiveAckTransportMs": 95.3,
            "clientRequestSendMs": 0.2,
            "clientResponseChars": 10523,
            "outsideHandlerRoundTripMs": 96.7,
            "unmeasuredRoundTripMs": 95.2,
            "messageCount": 16,
            "rpcDurationMs": 101.2
        },
        {
            "atMs": 157.5,
            "sincePreviousStageMs": 0.3,
            "name": "transcript-transformed",
            "transformDurationMs": 0.3,
            "messageCount": 16
        },
        {
            "atMs": 158,
            "sincePreviousStageMs": 0.5,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 158.1,
            "sincePreviousStageMs": 0.1,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 170.5,
            "sincePreviousStageMs": 12.4,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 288.8,
            "sincePreviousStageMs": 118.3,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 2.5
        },
        {
            "atMs": 413.1,
            "sincePreviousStageMs": 124.3,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 436.9,
            "sincePreviousStageMs": 23.8,
            "name": "paint-raf-1",
            "waitDurationMs": 278.8,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 446.1,
            "sincePreviousStageMs": 9.2,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.1,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 0.86,
            "backendSendTotalMs": 0.87
        },
        {
            "atMs": 455.5,
            "sincePreviousStageMs": 9.4,
            "name": "paint-raf-2",
            "waitDurationMs": 297.5,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 487.5,
    "outcome": "cold-resumed",
    "requestId": 2,
    "session": "20260…02c54e",
    "stages": [
        {
            "atMs": 0.2,
            "sincePreviousStageMs": 0.2,
            "name": "initial-cache",
            "warm": false
        },
        {
            "atMs": 0.3,
            "sincePreviousStageMs": 0.1,
            "name": "profile-resolve-start",
            "sessionWasInSidebar": true
        },
        {
            "atMs": 11.2,
            "sincePreviousStageMs": 10.9,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 74.8,
            "sincePreviousStageMs": 63.6,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 75.5,
            "sincePreviousStageMs": 0.7,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 76.8,
            "sincePreviousStageMs": 1.3,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.5
        },
        {
            "atMs": 80,
            "sincePreviousStageMs": 3.2,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 80,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 80.1,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 80.1,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 175.5,
            "sincePreviousStageMs": 95.4,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 4296.2,
            "backendAgentBuildLastFinishedAgoMs": 4174.57,
            "backendDbOpenMs": 1.36,
            "backendDispatchQueueMs": 3.88,
            "backendEventLoopQueueMs": 0.21,
            "backendHandlerMs": 6.97,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.68,
            "backendJsonSerializeMs": 0.1,
            "backendLiveLookupMs": 0.02,
            "backendLiveRegisterMs": 0.04,
            "backendMessageTransportMs": 0.05,
            "backendPromptSetupMs": 0.06,
            "backendRecordPrepareMs": 2.35,
            "backendReopenMs": 0.28,
            "backendResumeInfoMs": 0.86,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.26,
            "backendSlotClaimMs": 0.83,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.15,
            "backendWsAckSendMs": 0.22,
            "backendWsReceiveToAckMs": 0.02,
            "clientJsonParseMs": 0.1,
            "clientMessageEventQueueMs": 0.1,
            "clientReceiveAckEventQueueMs": 0,
            "clientReceiveAckToResponseMs": 2.4,
            "clientRequestReceiveAckMs": 92.6,
            "clientRequestReceiveAckTransportMs": 92.6,
            "clientRequestSendMs": 0.1,
            "clientResponseChars": 10525,
            "outsideHandlerRoundTripMs": 88.1,
            "unmeasuredRoundTripMs": 83.4,
            "messageCount": 16,
            "rpcDurationMs": 95.1
        },
        {
            "atMs": 175.7,
            "sincePreviousStageMs": 0.2,
            "name": "transcript-transformed",
            "transformDurationMs": 0.2,
            "messageCount": 16
        },
        {
            "atMs": 175.9,
            "sincePreviousStageMs": 0.2,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 175.9,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 186.8,
            "sincePreviousStageMs": 10.9,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 276.7,
            "sincePreviousStageMs": 89.9,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 1.7
        },
        {
            "atMs": 404.9,
            "sincePreviousStageMs": 128.2,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 468.9,
            "sincePreviousStageMs": 64,
            "name": "paint-raf-1",
            "waitDurationMs": 293,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 477.4,
            "sincePreviousStageMs": 8.5,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.1,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 0.95,
            "backendSendTotalMs": 0.96
        },
        {
            "atMs": 487.5,
            "sincePreviousStageMs": 10.1,
            "name": "paint-raf-2",
            "waitDurationMs": 311.6,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 472.2,
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
            "atMs": 0,
            "sincePreviousStageMs": 0,
            "name": "profile-resolve-start",
            "sessionWasInSidebar": true
        },
        {
            "atMs": 13.6,
            "sincePreviousStageMs": 13.6,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 83.2,
            "sincePreviousStageMs": 69.6,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 84.3,
            "sincePreviousStageMs": 1.1,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 86,
            "sincePreviousStageMs": 1.7,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.4
        },
        {
            "atMs": 92,
            "sincePreviousStageMs": 6,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 92,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 92.1,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 92.1,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 260.2,
            "sincePreviousStageMs": 168.1,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 3850.09,
            "backendAgentBuildLastFinishedAgoMs": 4965.52,
            "backendDbOpenMs": 1.18,
            "backendDispatchQueueMs": 0.14,
            "backendEventLoopQueueMs": 0.22,
            "backendHandlerMs": 5.57,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.63,
            "backendJsonSerializeMs": 0.17,
            "backendLiveLookupMs": 0.02,
            "backendLiveRegisterMs": 0.03,
            "backendMessageTransportMs": 0.02,
            "backendPromptSetupMs": 0.09,
            "backendRecordPrepareMs": 1.45,
            "backendReopenMs": 0.16,
            "backendResumeInfoMs": 0.68,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.24,
            "backendSlotClaimMs": 0.9,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.16,
            "backendWsAckSendMs": 0.25,
            "backendWsReceiveToAckMs": 0.03,
            "clientJsonParseMs": 0.3,
            "clientMessageEventQueueMs": 0.2,
            "clientReceiveAckEventQueueMs": 0,
            "clientReceiveAckToResponseMs": 8.1,
            "clientRequestReceiveAckMs": 159.3,
            "clientRequestReceiveAckTransportMs": 159.3,
            "clientRequestSendMs": 0.1,
            "clientResponseChars": 10525,
            "outsideHandlerRoundTripMs": 162.1,
            "unmeasuredRoundTripMs": 160.7,
            "messageCount": 16,
            "rpcDurationMs": 167.7
        },
        {
            "atMs": 260.5,
            "sincePreviousStageMs": 0.3,
            "name": "transcript-transformed",
            "transformDurationMs": 0.3,
            "messageCount": 16
        },
        {
            "atMs": 260.8,
            "sincePreviousStageMs": 0.3,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 260.8,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 276.7,
            "sincePreviousStageMs": 15.9,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 348,
            "sincePreviousStageMs": 71.3,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 2.4
        },
        {
            "atMs": 454.6,
            "sincePreviousStageMs": 106.6,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 460.6,
            "sincePreviousStageMs": 6,
            "name": "paint-raf-1",
            "waitDurationMs": 199.8,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 467.6,
            "sincePreviousStageMs": 7,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.17,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 1.13,
            "backendSendTotalMs": 1.14
        },
        {
            "atMs": 472.2,
            "sincePreviousStageMs": 4.6,
            "name": "paint-raf-2",
            "waitDurationMs": 211.3,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 386.6,
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
            "atMs": 8.6,
            "sincePreviousStageMs": 8.5,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 46.9,
            "sincePreviousStageMs": 38.3,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 47.4,
            "sincePreviousStageMs": 0.5,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 48.2,
            "sincePreviousStageMs": 0.8,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.3
        },
        {
            "atMs": 49.6,
            "sincePreviousStageMs": 1.4,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 49.6,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 49.6,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 49.6,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 124.6,
            "sincePreviousStageMs": 75,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 4041.29,
            "backendAgentBuildLastFinishedAgoMs": 6347.93,
            "backendDbOpenMs": 2.16,
            "backendDispatchQueueMs": 0.66,
            "backendEventLoopQueueMs": 0.2,
            "backendHandlerMs": 6.71,
            "backendHandlerToWriteMs": 0.01,
            "backendHistoryReadMs": 0.6,
            "backendJsonSerializeMs": 0.09,
            "backendLiveLookupMs": 0.02,
            "backendLiveRegisterMs": 0.03,
            "backendMessageTransportMs": 0.02,
            "backendPromptSetupMs": 0.06,
            "backendRecordPrepareMs": 1.2,
            "backendReopenMs": 0.15,
            "backendResumeInfoMs": 0.69,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.27,
            "backendSlotClaimMs": 1.32,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.17,
            "backendWsAckSendMs": 0.17,
            "backendWsReceiveToAckMs": 0.02,
            "clientJsonParseMs": 0.1,
            "clientMessageEventQueueMs": 0,
            "clientReceiveAckEventQueueMs": 0.1,
            "clientReceiveAckToResponseMs": 1.5,
            "clientRequestReceiveAckMs": 73,
            "clientRequestReceiveAckTransportMs": 72.9,
            "clientRequestSendMs": 0.1,
            "clientResponseChars": 10523,
            "outsideHandlerRoundTripMs": 68,
            "unmeasuredRoundTripMs": 66.7,
            "messageCount": 16,
            "rpcDurationMs": 74.7
        },
        {
            "atMs": 124.7,
            "sincePreviousStageMs": 0.1,
            "name": "transcript-transformed",
            "transformDurationMs": 0.1,
            "messageCount": 16
        },
        {
            "atMs": 124.9,
            "sincePreviousStageMs": 0.2,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 124.9,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 137.5,
            "sincePreviousStageMs": 12.6,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 206.8,
            "sincePreviousStageMs": 69.3,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 2.8
        },
        {
            "atMs": 324.9,
            "sincePreviousStageMs": 118.1,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 374.5,
            "sincePreviousStageMs": 49.6,
            "name": "paint-raf-1",
            "waitDurationMs": 249.6,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 380.9,
            "sincePreviousStageMs": 6.4,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.09,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 0.83,
            "backendSendTotalMs": 0.83
        },
        {
            "atMs": 386.6,
            "sincePreviousStageMs": 5.7,
            "name": "paint-raf-2",
            "waitDurationMs": 261.7,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 422.5,
    "outcome": "warm-restored",
    "requestId": 3,
    "session": "20260…02c54e",
    "stages": [
        {
            "atMs": 0,
            "sincePreviousStageMs": 0,
            "name": "initial-cache",
            "warm": true
        },
        {
            "atMs": 0,
            "sincePreviousStageMs": 0,
            "name": "profile-resolve-start",
            "sessionWasInSidebar": true
        },
        {
            "atMs": 14.3,
            "sincePreviousStageMs": 14.3,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 73.1,
            "sincePreviousStageMs": 58.8,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 73.8,
            "sincePreviousStageMs": 0.7,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 74.9,
            "sincePreviousStageMs": 1.1,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.3
        },
        {
            "atMs": 77.2,
            "sincePreviousStageMs": 2.3,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 77.2,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 77.3,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 77.5,
            "sincePreviousStageMs": 0.2,
            "name": "warm-view-published",
            "messageCount": 16
        },
        {
            "atMs": 77.5,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 92.7,
            "sincePreviousStageMs": 15.2,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 194.1,
            "sincePreviousStageMs": 101.4,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 2.8
        },
        {
            "atMs": 278.3,
            "sincePreviousStageMs": 84.2,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 343.6,
            "sincePreviousStageMs": 65.3,
            "name": "paint-raf-1",
            "waitDurationMs": 266.1,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 422.5,
            "sincePreviousStageMs": 78.9,
            "name": "paint-raf-2",
            "waitDurationMs": 345,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 426.1,
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
            "atMs": 11.1,
            "sincePreviousStageMs": 11,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 56.6,
            "sincePreviousStageMs": 45.5,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 57.4,
            "sincePreviousStageMs": 0.8,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 58.8,
            "sincePreviousStageMs": 1.4,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.4
        },
        {
            "atMs": 60.4,
            "sincePreviousStageMs": 1.6,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 60.4,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 60.4,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 60.5,
            "sincePreviousStageMs": 0.1,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 139.5,
            "sincePreviousStageMs": 79,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 4048.18,
            "backendAgentBuildLastFinishedAgoMs": 2007.33,
            "backendDbOpenMs": 1.1,
            "backendDispatchQueueMs": 0.1,
            "backendEventLoopQueueMs": 0.21,
            "backendHandlerMs": 5.42,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.51,
            "backendJsonSerializeMs": 0.1,
            "backendLiveLookupMs": 0.01,
            "backendLiveRegisterMs": 0.04,
            "backendMessageTransportMs": 0.05,
            "backendPromptSetupMs": 0.06,
            "backendRecordPrepareMs": 1.79,
            "backendReopenMs": 0.13,
            "backendResumeInfoMs": 0.96,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.16,
            "backendSlotClaimMs": 0.43,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.16,
            "backendWsAckSendMs": 0.37,
            "backendWsReceiveToAckMs": 0.02,
            "clientJsonParseMs": 0,
            "clientMessageEventQueueMs": 0,
            "clientReceiveAckEventQueueMs": 0,
            "clientReceiveAckToResponseMs": 2.3,
            "clientRequestReceiveAckMs": 75.8,
            "clientRequestReceiveAckTransportMs": 75.8,
            "clientRequestSendMs": 0,
            "clientResponseChars": 10523,
            "outsideHandlerRoundTripMs": 72.8,
            "unmeasuredRoundTripMs": 72,
            "messageCount": 16,
            "rpcDurationMs": 78.2
        },
        {
            "atMs": 139.8,
            "sincePreviousStageMs": 0.3,
            "name": "transcript-transformed",
            "transformDurationMs": 0.2,
            "messageCount": 16
        },
        {
            "atMs": 140.3,
            "sincePreviousStageMs": 0.5,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 140.4,
            "sincePreviousStageMs": 0.1,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 153.2,
            "sincePreviousStageMs": 12.8,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 243.2,
            "sincePreviousStageMs": 90,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 2.9
        },
        {
            "atMs": 367.6,
            "sincePreviousStageMs": 124.4,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 409.2,
            "sincePreviousStageMs": 41.6,
            "name": "paint-raf-1",
            "waitDurationMs": 268.9,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 419.2,
            "sincePreviousStageMs": 10,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.1,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 0.89,
            "backendSendTotalMs": 0.89
        },
        {
            "atMs": 426.1,
            "sincePreviousStageMs": 6.9,
            "name": "paint-raf-2",
            "waitDurationMs": 285.8,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 541.2,
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
            "atMs": 15.3,
            "sincePreviousStageMs": 15.2,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 72.4,
            "sincePreviousStageMs": 57.1,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 73.4,
            "sincePreviousStageMs": 1,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 75,
            "sincePreviousStageMs": 1.6,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.5
        },
        {
            "atMs": 89.5,
            "sincePreviousStageMs": 14.5,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 89.5,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 89.5,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 89.7,
            "sincePreviousStageMs": 0.2,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 197.2,
            "sincePreviousStageMs": 107.5,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 3601.51,
            "backendAgentBuildLastFinishedAgoMs": 1351.08,
            "backendDbOpenMs": 2.61,
            "backendDispatchQueueMs": 0.15,
            "backendEventLoopQueueMs": 0.2,
            "backendHandlerMs": 11.34,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.85,
            "backendJsonSerializeMs": 0.15,
            "backendLiveLookupMs": 0.02,
            "backendLiveRegisterMs": 0.08,
            "backendMessageTransportMs": 0.1,
            "backendPromptSetupMs": 0.11,
            "backendRecordPrepareMs": 3.38,
            "backendReopenMs": 0.21,
            "backendResumeInfoMs": 1.38,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.26,
            "backendSlotClaimMs": 2.11,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.23,
            "backendWsAckSendMs": 0.36,
            "backendWsReceiveToAckMs": 0.03,
            "clientJsonParseMs": 0.1,
            "clientMessageEventQueueMs": 0,
            "clientReceiveAckEventQueueMs": 0.1,
            "clientReceiveAckToResponseMs": 2.7,
            "clientRequestReceiveAckMs": 104.5,
            "clientRequestReceiveAckTransportMs": 104.4,
            "clientRequestSendMs": 0.1,
            "clientResponseChars": 10525,
            "outsideHandlerRoundTripMs": 96.1,
            "unmeasuredRoundTripMs": 95,
            "messageCount": 16,
            "rpcDurationMs": 107.4
        },
        {
            "atMs": 197.4,
            "sincePreviousStageMs": 0.2,
            "name": "transcript-transformed",
            "transformDurationMs": 0.2,
            "messageCount": 16
        },
        {
            "atMs": 197.7,
            "sincePreviousStageMs": 0.3,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 197.7,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 227.4,
            "sincePreviousStageMs": 29.7,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.1,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 346,
            "sincePreviousStageMs": 118.6,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 3.4
        },
        {
            "atMs": 489.9,
            "sincePreviousStageMs": 143.9,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 520.2,
            "sincePreviousStageMs": 30.3,
            "name": "paint-raf-1",
            "waitDurationMs": 322.5,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 530.5,
            "sincePreviousStageMs": 10.3,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.15,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 1.14,
            "backendSendTotalMs": 1.15
        },
        {
            "atMs": 541.1,
            "sincePreviousStageMs": 10.6,
            "name": "paint-raf-2",
            "waitDurationMs": 343.4,
            "rafCount": 2,
            "waitMethod": "double-raf"
        }
    ],
    "messageCount": 16,
    "profileSwitch": false
}

--

{
    "elapsedMs": 511.1,
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
            "atMs": 10.9,
            "sincePreviousStageMs": 10.8,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 14,
            "headIdPresent": true,
            "messageCount": 14,
            "repositoryVisibleMessageCount": 14
        },
        {
            "atMs": 53.5,
            "sincePreviousStageMs": 42.6,
            "name": "thread-message-list-layout-commit",
            "groupCount": 7,
            "hiddenGroupCount": 6,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 54.3,
            "sincePreviousStageMs": 0.8,
            "name": "desktop-layout-commit",
            "routeSessionMatch": true,
            "routedSession": true
        },
        {
            "atMs": 55.2,
            "sincePreviousStageMs": 0.9,
            "name": "runtime-adapter-synced",
            "messageCount": 14,
            "operationDurationMs": 0.3
        },
        {
            "atMs": 56.8,
            "sincePreviousStageMs": 1.6,
            "name": "profile-resolve-finished",
            "profileResolved": true,
            "sessionWasInSidebar": true
        },
        {
            "atMs": 56.9,
            "sincePreviousStageMs": 0.1,
            "name": "gateway-profile-start",
            "profileSwitch": false
        },
        {
            "atMs": 56.9,
            "sincePreviousStageMs": 0,
            "name": "gateway-profile-finished",
            "profileSwitch": false
        },
        {
            "atMs": 56.9,
            "sincePreviousStageMs": 0,
            "name": "resume-rpc-start"
        },
        {
            "atMs": 158.1,
            "sincePreviousStageMs": 101.2,
            "name": "resume-rpc-finished",
            "backendAgentBuildActiveCount": 0,
            "backendAgentBuildLastDurationMs": 3564.91,
            "backendAgentBuildLastFinishedAgoMs": 2230.56,
            "backendDbOpenMs": 0.94,
            "backendDispatchQueueMs": 0.11,
            "backendEventLoopQueueMs": 0.21,
            "backendHandlerMs": 4.98,
            "backendHandlerToWriteMs": 0.02,
            "backendHistoryReadMs": 0.44,
            "backendJsonSerializeMs": 0.1,
            "backendLiveLookupMs": 0.01,
            "backendLiveRegisterMs": 0.03,
            "backendMessageTransportMs": 0.03,
            "backendPromptSetupMs": 0.06,
            "backendRecordPrepareMs": 1.91,
            "backendReopenMs": 0.12,
            "backendResumeInfoMs": 0.74,
            "backendResumePrewarmEnabled": 1,
            "backendSessionLookupMs": 0.15,
            "backendSlotClaimMs": 0.43,
            "backendTimingVersion": 8,
            "backendTipResolveMs": 0.11,
            "backendWsAckSendMs": 0.25,
            "backendWsReceiveToAckMs": 0.03,
            "clientJsonParseMs": 0.1,
            "clientMessageEventQueueMs": 0.1,
            "clientReceiveAckEventQueueMs": 0,
            "clientReceiveAckToResponseMs": 2.1,
            "clientRequestReceiveAckMs": 98.6,
            "clientRequestReceiveAckTransportMs": 98.6,
            "clientRequestSendMs": 0.1,
            "clientResponseChars": 10524,
            "outsideHandlerRoundTripMs": 95.9,
            "unmeasuredRoundTripMs": 94.9,
            "messageCount": 16,
            "rpcDurationMs": 100.9
        },
        {
            "atMs": 158.5,
            "sincePreviousStageMs": 0.4,
            "name": "transcript-transformed",
            "transformDurationMs": 0.3,
            "messageCount": 16
        },
        {
            "atMs": 158.8,
            "sincePreviousStageMs": 0.3,
            "name": "cold-view-published",
            "messageCount": 16
        },
        {
            "atMs": 158.8,
            "sincePreviousStageMs": 0,
            "name": "paint-wait-start",
            "rafCount": 2,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 184,
            "sincePreviousStageMs": 25.2,
            "name": "runtime-message-repository-built",
            "operationDurationMs": 0.2,
            "coalescedCount": 16,
            "headIdPresent": true,
            "messageCount": 16,
            "repositoryVisibleMessageCount": 16
        },
        {
            "atMs": 290.3,
            "sincePreviousStageMs": 106.3,
            "name": "runtime-adapter-synced",
            "messageCount": 16,
            "operationDurationMs": 3
        },
        {
            "atMs": 432.8,
            "sincePreviousStageMs": 142.5,
            "name": "thread-message-list-layout-commit",
            "groupCount": 8,
            "hiddenGroupCount": 7,
            "mountedMessageCount": 2,
            "visibleGroupCount": 1
        },
        {
            "atMs": 496.8,
            "sincePreviousStageMs": 64,
            "name": "paint-raf-1",
            "waitDurationMs": 337.9,
            "rafCount": 1,
            "waitMethod": "double-raf"
        },
        {
            "atMs": 506.5,
            "sincePreviousStageMs": 9.7,
            "name": "resume-response-sent",
            "backendJsonSerializeMs": 0.1,
            "backendPrefixFrameCount": 0,
            "backendPrefixSendMs": 0,
            "backendResponseSendMs": 1.33,
            "backendSendTotalMs": 1.34
        },
        {
            "atMs": 511.1,
            "sincePreviousStageMs": 4.6,
            "name": "paint-raf-2",
            "waitDurationMs": 352.2,
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

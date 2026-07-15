(function attachTimelineModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});

  const MILESTONES = [
    { id: 'start', source: 'trace-start', read: () => 0 },
    { id: 'profile', source: 'profile-resolve-finished', read: (row) => row.profileAt },
    { id: 'rpc-start', source: 'resume-rpc-start', read: (row) => row.rpcStartAt },
    { id: 'rpc-finish', source: 'resume-rpc-finished', read: (row) => row.rpcFinishedAt },
    { id: 'view', source: 'cold-view-published', read: (row) => row.coldViewAt },
    { id: 'raf-1', source: 'paint-raf-1', read: (row) => row.raf1At },
    { id: 'raf-2', source: 'paint-raf-2', read: (row) => row.raf2At },
    { id: 'end', source: 'elapsedMs', read: (row) => row.elapsedMs },
  ];

  const PHASE_LABELS = {
    profile: 'Profile resolve',
    'rpc-start': 'Pre-RPC setup',
    'rpc-finish': 'Resume RPC',
    view: 'Publish view',
    'raf-1': 'View → RAF1',
    'raf-2': 'RAF1 → RAF2',
    end: 'Finalize',
  };

  function buildSampleTimeline(row) {
    const totalMs = Number(row?.elapsedMs);
    if (!Number.isFinite(totalMs) || totalMs < 0) {
      return {
        totalMs,
        segments: [],
        milestones: [],
        measuredMs: 0,
        gapMs: 0,
        missingStages: MILESTONES.slice(1, -1).map((milestone) => milestone.source),
        warnings: [{ type: 'invalid-elapsed', value: row?.elapsedMs }],
      };
    }

    const missingStages = [];
    const warnings = [];
    const milestones = [];
    let previousAtMs = 0;

    MILESTONES.forEach((milestone, ordinal) => {
      const atMs = Number(milestone.read(row));
      const required = milestone.id === 'start' || milestone.id === 'end';
      if (!Number.isFinite(atMs)) {
        if (!required) missingStages.push(milestone.source);
        return;
      }
      if (atMs < 0 || atMs > totalMs) {
        warnings.push({ type: 'out-of-range', stage: milestone.source, atMs, totalMs });
        return;
      }
      if (milestones.length > 0 && atMs < previousAtMs) {
        warnings.push({
          type: 'non-monotonic',
          stage: milestone.source,
          atMs,
          previousAtMs,
        });
        return;
      }

      milestones.push({
        id: milestone.id,
        label: milestone.source,
        source: milestone.source,
        atMs,
        ordinal,
      });
      previousAtMs = atMs;
    });

    const segments = [];
    for (let index = 1; index < milestones.length; index += 1) {
      const from = milestones[index - 1];
      const to = milestones[index];
      const durationMs = to.atMs - from.atMs;
      if (durationMs <= 0) continue;
      const kind = to.ordinal === from.ordinal + 1 ? 'phase' : 'gap';
      segments.push({
        id: `${from.id}--${to.id}`,
        kind,
        label: kind === 'phase' ? PHASE_LABELS[to.id] : 'Uninstrumented gap',
        startMs: from.atMs,
        endMs: to.atMs,
        durationMs,
        share: totalMs > 0 ? (durationMs / totalMs) * 100 : 0,
        sourceFrom: from.source,
        sourceTo: to.source,
      });
    }

    return {
      totalMs,
      segments,
      milestones,
      measuredMs: segments
        .filter((segment) => segment.kind === 'phase')
        .reduce((sum, segment) => sum + segment.durationMs, 0),
      gapMs: segments
        .filter((segment) => segment.kind === 'gap')
        .reduce((sum, segment) => sum + segment.durationMs, 0),
      missingStages,
      warnings,
    };
  }

  const timelineModule = { buildSampleTimeline };
  Object.assign(HermesPerfAnalyzer, timelineModule);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = timelineModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

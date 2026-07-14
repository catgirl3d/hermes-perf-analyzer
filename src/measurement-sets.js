(function attachMeasurementSetsModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});
  const trace = typeof module !== 'undefined' && module.exports
    ? require('./trace.js')
    : HermesPerfAnalyzer;
  const { normalizeTrace } = trace;

  const MEASUREMENT_SETS_STORAGE_KEY = 'hermes-perf-analyzer.measurement-sets.v1';
  const MEASUREMENT_SETS_EXPORT_FORMAT = 'hermes-perf-analyzer.measurement-sets';
  const MEASUREMENT_SETS_EXPORT_VERSION = 1;

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

  function createMeasurementSetsExport(sets, exportedAt = new Date().toISOString()) {
    return {
      format: MEASUREMENT_SETS_EXPORT_FORMAT,
      version: MEASUREMENT_SETS_EXPORT_VERSION,
      exportedAt,
      sets: JSON.parse(JSON.stringify(sets)),
    };
  }

  function parseMeasurementSetsImport(value) {
    const payload = typeof value === 'string' ? JSON.parse(value) : value;
    const sets = Array.isArray(payload)
      ? payload
      : payload?.format === MEASUREMENT_SETS_EXPORT_FORMAT
        && payload?.version === MEASUREMENT_SETS_EXPORT_VERSION
        && Array.isArray(payload?.sets)
        ? payload.sets
        : null;
    if (!sets) throw new Error('Unsupported measurement sets file');
    if (!sets.every(isValidStoredSet)) throw new Error('The file contains an invalid measurement set');
    return JSON.parse(JSON.stringify(sets));
  }

  function mergeMeasurementSets(existingSets, importedSets) {
    const ids = new Set(existingSets.map((set) => set.id));
    const sets = [...existingSets];
    let added = 0;
    let skipped = 0;
    importedSets.forEach((set) => {
      if (ids.has(set.id)) {
        skipped += 1;
        return;
      }
      ids.add(set.id);
      sets.push(set);
      added += 1;
    });
    return { sets, added, skipped };
  }

  function serializeSetTracesForInputs(set) {
    return set.traces.map((trace) => JSON.stringify(trace, null, 2));
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

  const measurementSetsModule = {
    createMeasurementSetsExport,
    loadMeasurementSets,
    mergeMeasurementSets,
    nextSetName,
    parseMeasurementSetsImport,
    persistMeasurementSets,
    selectSetForComparison,
    serializeSetTracesForInputs,
  };

  Object.assign(HermesPerfAnalyzer, measurementSetsModule);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = measurementSetsModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

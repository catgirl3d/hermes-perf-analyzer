const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildComparisonRows,
  buildComparisonTextReport,
  extract,
  loadMeasurementSets,
  nextSetName,
  normalizeTrace,
  persistMeasurementSets,
  selectSetForComparison,
  shouldAppendTrailingTrace,
} = require('./perf-analyzer.js');

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
  const report = buildComparisonTextReport(setA, setB, buildComparisonRows(rowsA, rowsB));

  assert.match(report, /A: Before \| samples: 2/);
  assert.match(report, /B: After \| samples: 2/);
  assert.match(report, /Total elapsed/);
  assert.match(report, /delta\s+-20\.0 ms/);
  assert.match(report, /change\s+-18\.2%/);
});

test('normalizes a raw stages array before extraction', () => {
  const stages = trace(200, 60).stages;
  const normalized = normalizeTrace(stages);
  const row = extract(normalized);

  assert.equal(normalized.outcome, 'cold-resumed');
  assert.equal(row.elapsedMs, 200);
  assert.equal(row.rpcDurationMs, 60);
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

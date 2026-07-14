(function attachStatsModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});

  function fmt(value, digits = 1) {
    return isNaN(value) || value == null ? '—' : Number(value).toFixed(digits);
  }

  function fmtMs(value) {
    return `${fmt(value)} ms`;
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

  function classifyRelativeValue(value, values) {
    const samples = values.filter((sample) => Number.isFinite(sample));
    const baseline = median(samples);
    const sampleCount = samples.length;
    const percent = Number.isFinite(value) && Number.isFinite(baseline) && baseline !== 0
      ? ((value - baseline) / baseline) * 100
      : NaN;
    const result = (key) => ({ key, baseline, percent, sampleCount });

    if (!Number.isFinite(value) || sampleCount < 3 || !Number.isFinite(baseline) || baseline <= 0) {
      return result('typical');
    }

    const delta = value - baseline;
    const ratio = value / baseline;
    const meaningfulDelta = Math.abs(delta) >= Math.max(1, baseline * 0.1);
    const q1 = percentile(samples, 25);
    const q3 = percentile(samples, 75);
    const severeBoundary = q3 + Math.max((q3 - q1) * 0.5, 1);

    if (meaningfulDelta && ratio >= 2.5 && value > severeBoundary) return result('outlier');
    if (meaningfulDelta && ratio >= 1.5) return result('slow');
    if (meaningfulDelta && ratio <= (2 / 3)) return result('fast');
    return result('typical');
  }

  function classifyTailImpact(deltaMs) {
    const absoluteDelta = Math.abs(Number(deltaMs));
    if (!Number.isFinite(absoluteDelta) || absoluteDelta < 0.1) {
      return { key: 'micro', label: 'micro' };
    }
    if (absoluteDelta < 1) return { key: 'small', label: 'small' };
    if (absoluteDelta < 10) return { key: 'moderate', label: 'moderate' };
    return { key: 'significant', label: 'significant' };
  }

  function formatSigned(value, suffix = '') {
    if (!Number.isFinite(value)) return '—';
    const sign = value > 0 ? '+' : '';
    return `${sign}${fmt(value)}${suffix}`;
  }

  function formatMetricMeasurement(value, unit, forcedUnit) {
    if (!Number.isFinite(value)) return '—';
    if (unit === 'ms') {
      const displayUnit = forcedUnit || (Math.abs(value) < 1 ? 'µs' : 'ms');
      if (displayUnit === 'µs') {
        const microseconds = value * 1000;
        const digits = Math.abs(microseconds) < 10 && microseconds !== 0 ? 1 : 0;
        return `${fmt(microseconds, digits)} µs`;
      }
      const absoluteValue = Math.abs(value);
      const digits = absoluteValue < 0.1 ? 3 : absoluteValue < 1 ? 2 : 1;
      return `${fmt(value, digits)} ms`;
    }
    if (unit === 'count') return fmt(value);
    if (unit === 'chars') return `${fmt(value)} chars`;
    return `${fmt(value)} ${unit}`.trim();
  }

  function formatSignedMetricMeasurement(value, unit) {
    if (!Number.isFinite(value)) return '—';
    const sign = value >= 0 ? '+' : '−';
    return `${sign}${formatMetricMeasurement(Math.abs(value), unit)}`;
  }

  function describeSampleConfidence(sampleCount) {
    return sampleCount < 10
      ? { label: 'few samples', badgeClass: 'tail-badge-warn' }
      : { label: 'enough samples', badgeClass: 'tail-badge-ok' };
  }

  function summarizePercentiles(p50, p90Value, sampleCount) {
    const confidence = describeSampleConfidence(sampleCount);
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
      confidence: confidence.label,
    };
  }

  function buildMetricPresentation({ stats, summary, unit, distribution }) {
    const primaryUnit = unit === 'ms' && Math.max(Math.abs(stats.med), Math.abs(stats.p90)) < 1
      ? 'µs'
      : unit;
    return {
      p50: formatMetricMeasurement(stats.med, unit, primaryUnit),
      p90: formatMetricMeasurement(stats.p90, unit, primaryUnit),
      p95: formatMetricMeasurement(stats.p95, unit, primaryUnit),
      max: formatMetricMeasurement(stats.max, unit, primaryUnit),
      delta: formatSignedMetricMeasurement(summary.delta, unit),
      relative: formatSigned(summary.percent, '%'),
      impact: distribution === 'latency' ? classifyTailImpact(summary.delta) : null,
    };
  }

  const statsModule = {
    buildMetricPresentation,
    classifyTailImpact,
    classifyRelativeValue,
    computeStats,
    describeSampleConfidence,
    fmt,
    fmtMs,
    formatSigned,
    summarizePercentiles,
  };

  Object.assign(HermesPerfAnalyzer, statsModule);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = statsModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

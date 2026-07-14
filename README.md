# Hermes Perf Analyzer

A local HTML tool for analyzing Hermes `cold-resume` traces.

It accepts multiple JSON traces, calculates `p50 / p90 / p95` aggregates, shows the key resume pipeline stages, backend sub-timings, and generates a plain-text report that can be pasted directly into chat.

## Run

- Open `perf-analyzer.html` in a browser.
- Paste one JSON trace into each input box.
- Click `Analyze`.

No build step, server, or dependencies are required.

## Supported Input

You can paste either:

- a trace object: `{ "elapsedMs": 1234, "stages": [...] }`
- or a raw stages array: `[{ "name": "resume-rpc-start", "atMs": 120 }, ...]`

Both legacy and new/snapshot timing layouts are supported.

## What It Shows

- `elapsedMs`, `resume-rpc`, `cold-view-published`, paint wait
- `p50 / p90 / p95 / min / max` aggregates
- backend / transport breakdown when present in the trace
- per-sample cards
- shareable text report with copy/save actions

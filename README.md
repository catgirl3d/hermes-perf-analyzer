# Hermes Perf Analyzer

A local HTML tool for analyzing Hermes `cold-resume` traces.

It accepts multiple JSON traces, calculates `p50 / p90 / p95` aggregates, shows the key resume pipeline stages, backend sub-timings, and generates a plain-text report that can be pasted directly into chat.

Measurement runs can be saved as named sets in browser storage. Select any two saved sets to compare their median timings and see the absolute and percentage delta from A to B.

## Run

- Open `index.html` in a browser.
- Paste one JSON trace into each input box.
- Filling the last input automatically adds another empty trace box.
- Click `Analyze`.
- Optionally save the analyzed traces as a measurement set for later A/B comparison.

No build step, server, or dependencies are required.

## Supported Input

You can paste either:

- a trace object: `{ "elapsedMs": 1234, "stages": [...] }`
- or a raw stages array: `[{ "name": "resume-rpc-start", "atMs": 120 }, ...]`

Both legacy and new/snapshot timing layouts are supported, including timing v9 prewarm metadata and its additional live lookup, live register, reopen, and tip-resolve timings.

## Measurement Sets

After analyzing the current traces, save them as a named measurement set. If no name is entered, the app assigns names such as `Set A`, `Set B`, and `Set C` automatically.

Saved sets:

- contain a snapshot of all valid traces from the latest analysis
- persist in browser `localStorage` across page reloads
- are not removed by `Clear all`
- can be selected or deleted independently

Select two sets to compare them. The first selected set is `A`, the second is `B`. Selecting another set keeps the two most recently selected sets in the comparison.

## A/B Comparison

The comparison table uses the median (`p50`) of each set and displays:

- the value for A
- the value for B
- the absolute delta `B - A` in milliseconds
- the percentage change relative to A

For timing metrics, a negative delta means B is faster.

When two sets are selected, the app also generates a separate **Shareable comparison report**. It contains the set names, sample counts, p50 values, and all deltas in a compact plain-text format intended for pasting into an LLM or chat. Use `Copy comparison` to copy the complete block.

## What It Shows

- `elapsedMs`, `resume-rpc`, `cold-view-published`, paint wait
- `p50 / p90 / p95 / min / max` aggregates
- backend / transport breakdown when present in the trace
- per-sample cards
- persistent named measurement sets and A/B median deltas
- shareable aggregate report with copy/save actions
- separate LLM-ready A/B comparison report

For backend cards, `p50` is the typical value and `p90` is the slow tail. `tail = p90 - p50`: a small green tail indicates stable timings, while a large red tail indicates high variability. Treat `p90` as low confidence when there are fewer than 10 samples.

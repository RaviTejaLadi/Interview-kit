# Difference between normal `<script>`, `<script async>`, and `<script defer>`

This is a very common interview question. ⭐

## Normal `<script>`

```html id="3f2h4a"
<!-- Classic script: parsing pauses during fetch and execution -->
<script src="/app.js"></script>
```

Behavior:

1. HTML parsing starts.
2. Browser encounters `<script>`.
3. HTML parsing pauses.
4. Script is downloaded.
5. Script executes.
6. HTML parsing resumes.

```text
HTML Parsing ──────┐      ┌──────────────
                   │      │
                   ↓      ↓
                Download → Execute
```

---

## `<script async>`

```html id="f4w6q1"
<!-- Async script downloads in parallel and executes as soon as it is ready -->
<script async src="/analytics.js"></script>
```

Behavior:

- HTML parsing continues while the script downloads.
- When the script finishes downloading, HTML parsing can be **paused**.
- The script executes immediately.
- HTML parsing then continues.

```text
HTML Parsing ─────────────────────────
       │
       ├── Download Script ──→ Execute
       │                         ↑
       └──── parsing may pause ──┘
```

### Important

Multiple async scripts **do not guarantee execution order**.

```html id="v7c3lz"
<!-- These scripts may execute in whichever order they finish downloading -->
<script async src="/analytics.js"></script>
<script async src="/ads.js"></script>
```

Use `async` when scripts are **independent** and don't depend on each other or the DOM being fully parsed.

---

## `<script defer>`

```html id="z7m3ye"
<!-- Defer downloads in parallel but executes after HTML parsing finishes -->
<script defer src="/app.js"></script>
```

Behavior:

- HTML parsing continues while the script downloads.
- Script execution waits until HTML parsing is complete.
- Deferred scripts execute **in document order**.

```text
HTML Parsing ───────────────────────→ Complete
       │
       └── Download Script ──────────→ Execute
```

For example:

```html id="5p1f5m"
<!-- Deferred scripts execute in the order they appear -->
<script defer src="/first.js"></script>
<script defer src="/second.js"></script>
```

Execution order:

```text
first.js
   ↓
second.js
```

### Quick comparison

| Script  | HTML parsing | Download       | Execution                    |
| ------- | ------------ | -------------- | ---------------------------- |
| Normal  | ⛔ Paused    | Blocks parsing | Immediately after download   |
| `async` | Continues    | Parallel       | As soon as downloaded        |
| `defer` | Continues    | Parallel       | After HTML parsing, in order |

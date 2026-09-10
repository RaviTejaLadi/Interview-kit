# Script Loading Matrix

A **Script Loading Matrix** is a way to compare how different `<script>` configurations affect **HTML parsing, downloading, execution order, and DOM availability**.

## 1. Normal `<script>`

A normal classic script **blocks HTML parsing**.

When the browser encounters it:

1. HTML parsing pauses.
2. Script downloads.
3. Script executes.
4. HTML parsing resumes.

```html
<!-- A normal script blocks HTML parsing until it downloads and executes -->
<script src="/js/app.js"></script>
```

**Best for:** Scripts that intentionally need to execute at a specific point during parsing, though this is less common in modern applications.

---

## 2. `async`

`async` allows the browser to **download the script while HTML continues parsing**.

Once the script finishes downloading, it executes immediately, potentially interrupting HTML parsing.

```html
<!-- Download in parallel and execute immediately when ready -->
<script src="/js/analytics.js" async></script>
```

### Characteristics

* Download → **parallel**
* Execution → **as soon as downloaded**
* HTML parser → can be interrupted during execution
* Execution order → **not guaranteed**
* DOM availability → don't assume the full DOM exists

**Best for:** Independent scripts such as analytics or advertising.

---

## 3. `defer`

`defer` downloads the script **in parallel with HTML parsing**, but execution waits until HTML parsing is complete.

Deferred classic scripts execute in **document order**.

```html
<!-- Download in parallel and execute after HTML parsing completes -->
<script src="/js/vendor.js" defer></script>
<script src="/js/app.js" defer></script>
```

Here:

```text
Download vendor.js ────────┐
                           ├── Execute vendor.js
Download app.js ──────────┘
                               ↓
                         Execute app.js
```

**Best for:** Application scripts that need the DOM and/or need predictable execution order.

---

## 4. `type="module"`

A module script uses JavaScript's **ES module system** and is **deferred by default**.

It supports `import` and `export`.

```html
<!-- Module scripts are deferred by default and support ES module syntax -->
<script type="module" src="/js/main.js"></script>
```

For example:

```javascript
// Import functionality from another ES module
import { calculateTotal } from "./utils.js";

console.log(calculateTotal(100, 20));
```

### Characteristics

* Downloads without blocking HTML parsing.
* Executes after parsing by default.
* Supports `import` / `export`.
* Has its own module scope.
* Runs in strict mode.
* Dependencies are fetched as part of the module graph.

---

# 5. `async` + `type="module"`

Module scripts can also use `async`.

In this case, the module executes **as soon as the module and its dependencies are ready**, rather than waiting for HTML parsing to finish.

```html
<!-- Download the module graph in parallel and execute as soon as it is ready -->
<script type="module" src="/js/analytics-module.js" async></script>
```

This is useful when the module is **independent of the rest of the page**.

---

# ⭐ Complete Script Loading Matrix

| Script            | Blocks HTML parsing? | Download            | Execution             | Order guaranteed?             | DOM ready?        |
| ----------------- | -------------------- | ------------------- | --------------------- | ----------------------------- | ----------------- |
| Normal `<script>` | ✅ Yes                | Sequential/blocking | Immediately           | Depends on placement          | ❌ Not necessarily |
| `async`           | ❌ No*                | Parallel            | As soon as downloaded | ❌ No                          | ❌ Not necessarily |
| `defer`           | ❌ No                 | Parallel            | After HTML parsing    | ✅ Yes                         | ✅ Yes             |
| `type="module"`   | ❌ No                 | Parallel            | Deferred by default   | Module dependency order       | ✅ Yes             |
| `module + async`  | ❌ No                 | Parallel            | As soon as ready      | ❌ Not for independent modules | ❌ Not necessarily |

* `async` execution can temporarily pause HTML parsing while the script executes.

---

# ⭐ Visual Comparison

```text
Normal:

HTML ── Parse ── SCRIPT DOWNLOAD ── EXECUTE ── Parse ──


async:

HTML ── Parse ── Parse ── Parse ──┐
          │                       │
          └── Download ── Execute ┘
                             ↑
                     whenever ready


defer:

HTML ── Parse ── Parse ── Parse ── Finished
          │
          └── Download ──────────────────┐
                                         ↓
                                      Execute


module:

HTML ── Parse ── Parse ── Parse ── Finished
          │
          └── Download module graph ─────┐
                                         ↓
                                      Execute
```

## 🎯 Interview shortcut

Remember these four rules:

> **Normal** → **Download → Execute → Continue parsing**

> **`async`** → **Download in parallel → Execute whenever ready**

> **`defer`** → **Download in parallel → Execute after parsing, in order**

> **`module`** → **ES module + deferred by default**

### Which one should you use?

* **Analytics / independent third-party script** → `async`
* **Main application script** → `defer`
* **Modern ES module application** → `type="module"`
* **Module that is completely independent and should run as soon as ready** → `type="module" async`

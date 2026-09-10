# `defer`, `async`, and `type="module"`

These attributes control **when JavaScript files are downloaded and executed relative to HTML parsing**.

## `defer`

A classic script with `defer` downloads **in parallel with HTML parsing**, but executes after HTML parsing has finished.

Deferred classic scripts execute **in document order**.

```html
<!-- Download without blocking parsing and execute after HTML parsing in order -->
<script src="/js/app.js" defer></script>
```

Good for scripts that:

* Need the DOM.
* Depend on other scripts in a known order.
* Are part of the main application.

---

## `async`

An `async` classic script also downloads while HTML is being parsed, but executes **as soon as it finishes downloading**.

Its execution order relative to other async scripts is **not guaranteed**.

```html
<!-- Download in parallel and execute as soon as the script is ready -->
<script src="/js/analytics.js" async></script>
```

Good for:

* Analytics
* Independent third-party scripts
* Scripts that don't depend on the DOM or other scripts.

---

## `type="module"`

`type="module"` tells the browser that the script is an **ES module**.

Module scripts are **deferred by default**.

They support:

* `import`
* `export`
* Module scope
* Strict mode
* Dependency loading

```html
<!-- Load an ES module; module scripts are deferred by default -->
<script type="module" src="/js/main.js"></script>
```

### Comparison

| Script            | Download       | Execution                    |
| ----------------- | -------------- | ---------------------------- |
| Normal `<script>` | Blocks parsing | Immediately when encountered |
| `async`           | Parallel       | As soon as downloaded        |
| `defer`           | Parallel       | After parsing, in order      |
| `type="module"`   | Parallel       | Deferred by default          |

**Interview shortcut:**

> **`async` = execute whenever ready**
> **`defer` = execute after parsing, in order**
> **`module` = ES module + deferred by default**

# When should you use `async` vs `defer`?

The choice depends mainly on **whether the script depends on other scripts or the DOM**.

## Use `async` when:

The script is **independent**.

Common examples:

* Analytics
* Ads
* Tracking scripts
* Independent third-party scripts

```html id="qj6s9k"
<!-- Independent analytics script can load asynchronously -->
<script async src="/analytics.js"></script>
```

You don't care exactly when it executes relative to other scripts.

---

## Use `defer` when:

The script needs the **HTML document to be parsed** or depends on other deferred scripts.

For example:

```html id="9c4x2d"
<!-- Application scripts execute after parsing and preserve their order -->
<script defer src="/vendor.js"></script>
<script defer src="/app.js"></script>
```

Execution:

```text
HTML parsing completes
        ↓
vendor.js
        ↓
app.js
```

### Easy rule ⭐

> **Independent → `async`**
> **DOM-dependent or order-dependent → `defer`**

For many traditional frontend application scripts, `defer` is the safer default.
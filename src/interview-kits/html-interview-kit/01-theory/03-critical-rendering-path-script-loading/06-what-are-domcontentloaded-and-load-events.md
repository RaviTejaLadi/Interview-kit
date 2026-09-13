# What are `DOMContentLoaded` and `load` events?

These are browser lifecycle events, but they happen at different points.

## `DOMContentLoaded`

`DOMContentLoaded` fires when:

> **The HTML document has been completely parsed and deferred/module scripts have finished executing.**

It does **not** wait for images and most other subresources to finish loading.

```javascript id="j3z0r4"
// Run code when the HTML document has been parsed and deferred scripts have executed.
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready');
});
```

Conceptually:

```text
HTML parsed
    ↓
Deferred/module scripts executed
    ↓
DOMContentLoaded
```

---

## `load`

The `load` event fires after the page and its dependent resources have finished loading.

This can include:

- Images
- Stylesheets
- Scripts
- Other resources

```javascript id="n7m4tc"
// Run code after the page and its dependent resources have loaded.
window.addEventListener('load', () => {
  console.log('Page and resources loaded');
});
```

### Comparison

| Event              | Waits for HTML parsing | Waits for deferred scripts | Waits for images/resources |
| ------------------ | ---------------------: | -------------------------: | -------------------------: |
| `DOMContentLoaded` |                     ✅ |                         ✅ |                         ❌ |
| `load`             |                     ✅ |                         ✅ |                         ✅ |

### Easy way to remember

**DOMContentLoaded → DOM is ready**

**load → Page resources are loaded**

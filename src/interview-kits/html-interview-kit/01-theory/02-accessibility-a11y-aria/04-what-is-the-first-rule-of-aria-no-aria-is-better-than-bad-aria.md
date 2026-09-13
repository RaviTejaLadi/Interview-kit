# What is the First Rule of ARIA?

The first rule of ARIA is commonly summarized as:

> **"No ARIA is better than bad ARIA."**

The idea is:

**If a native HTML element already provides the required semantics and behavior, prefer it instead of recreating it with ARIA.**

For example, don't do this:

```html
<!-- Avoid recreating a button with a div -->
<div role="button" tabindex="0">Submit</div>
```

Use the native element:

```html
<!-- Native button provides semantics, keyboard support, and behavior -->
<button type="button">Submit</button>
```

The native `<button>` already provides:

- Button semantics
- Keyboard interaction
- Focus behavior
- Expected browser behavior
- Better assistive-technology support

### Good rule to remember ⭐

**Native HTML → CSS → JavaScript → ARIA only when necessary.**

ARIA should **enhance semantics**, not replace standard HTML unnecessarily.

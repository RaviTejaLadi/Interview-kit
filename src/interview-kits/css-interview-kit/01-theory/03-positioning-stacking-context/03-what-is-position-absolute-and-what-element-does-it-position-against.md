# What is `position: absolute` and what element does it position against?

`absolute` removes the element from the **normal document flow**.

The element is positioned using `top`, `right`, `bottom`, and `left`.

The important question is:

> **Positioned against what?**

An absolutely positioned element is generally positioned relative to its **nearest ancestor that establishes a containing block**. The common case is a parent/ancestor with `position: relative`, `absolute`, `fixed`, or `sticky`.

```css
/* This parent establishes the containing block. */
.card {
  position: relative;
}

/* Positioned relative to .card. */
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
}
```

HTML:

```html
<!-- The badge is positioned relative to the card. -->
<div class="card">
  <span class="badge">New</span>
  <h2>Product</h2>
</div>
```

If no suitable containing block exists, the containing block is established by the relevant viewport/root-level layout context.

### Important distinction

```text
relative
    ↓
stays in normal flow

absolute
    ↓
removed from normal flow
    ↓
positioned using a containing block
```

**Common interview answer:**

> An absolutely positioned element is positioned relative to its nearest positioned ancestor.

That's useful shorthand, although the CSS specification's concept is more precisely the **containing block**.

# What is `z-index` and when does it apply?

`z-index` controls the **stacking order** of elements along the z-axis.

Think of it as deciding which element is visually **in front of another** when they overlap.

```css
/* Higher stacking order within the same stacking context. */
.modal {
  position: fixed;
  z-index: 1000;
}

.overlay {
  position: fixed;
  z-index: 999;
}
```

The modal appears above the overlay.

### Does `z-index` require positioning?

Historically, developers often say:

> "`z-index` only works on positioned elements."

That's incomplete today.

`z-index` applies to:

- Positioned elements (`relative`, `absolute`, `fixed`, `sticky`)
- Flex items
- Grid items
- Certain elements that establish stacking contexts

Example:

```css
/* z-index works because this is a positioned element. */
.box {
  position: relative;
  z-index: 10;
}
```

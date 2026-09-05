# `rem` vs `em`: Key differences and inheritance pitfalls

Both `rem` and `em` are relative font-based units, but their reference points differ.

### `rem`

`rem` means **root em**.

It is based on the font size of the root `<html>` element.

If:

```css id="4j1g2h"
/* Set the root font size */
html {
  font-size: 16px;
}
```

Then:

```css id="v7j2g8"
/* 2rem = 32px when the root font size is 16px */
.heading {
  font-size: 2rem;
}
```

```text
1rem = 16px
2rem = 32px
3rem = 48px
```

### `em`

`em` is based on the relevant element's font size, which can be inherited from its parent.

This can cause **compounding/inheritance effects**.

```css id="5r8k3s"
/* Demonstrate em inheritance */
.parent {
  font-size: 20px;
}

.child {
  font-size: 1.5em;
}
```

The child's font size becomes:

```text
20px × 1.5 = 30px
```

Nested `em` values can become harder to reason about:

```css id="k5q8m1"
/* Nested em values compound through inherited font sizes */
.parent {
  font-size: 20px;
}

.child {
  font-size: 1.5em;
}

.grandchild {
  font-size: 1.5em;
}
```

Conceptually:

```text
Parent       = 20px
Child        = 30px
Grandchild   = 45px
```

### Key difference

```text
rem → based on root font size
em  → based on the relevant inherited/current font size
```

**Practical advice:** `rem` is often easier for global typography and spacing. `em` is useful when you intentionally want a component to scale based on its own font size.

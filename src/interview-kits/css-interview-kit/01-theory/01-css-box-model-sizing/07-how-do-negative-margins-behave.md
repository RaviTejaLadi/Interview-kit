# How do negative margins behave?

A **negative margin pulls an element toward another element**.

For example:

```css
/* Pull the second box upward by 20px. */
.box {
  margin-top: -20px;
}
```

Instead of creating space, a negative margin **reduces the space** and can cause elements to overlap.

### Example

```css
/* Move the second box upward so it overlaps the first box. */
.second {
  margin-top: -30px;
}
```

Conceptually:

```text
Before:

┌──────────────┐
│    Box 1     │
└──────────────┘

      30px

┌──────────────┐
│    Box 2     │
└──────────────┘


After margin-top: -30px:

┌──────────────┐
│    Box 1     │
│ ┌────────────┐
│ │   Box 2    │
└─│────────────┘
  └────────────┘
```

Negative margins can be useful for:

* overlapping cards
* pulling elements closer
* certain layout techniques
* positioning elements within normal document flow

### Negative horizontal margin

```css
/* Pull the element 20px toward the left. */
.box {
  margin-left: -20px;
}
```

### Negative margin is different from `transform`

This:

```css
/* Changes the element's layout position. */
.box {
  margin-top: -20px;
}
```

affects the element's **layout relationship with other elements**.

Whereas:

```css
/* Visually moves the element without changing normal layout flow. */
.box {
  transform: translateY(-20px);
}
```

visually moves the element while its original layout space is generally preserved.

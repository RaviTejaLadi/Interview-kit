# What is a Stacking Context?

A **stacking context** is an isolated group of elements that the browser paints together according to their stacking order.

Think of it as a **layer group**.

```text
Page
│
├── Stacking Context A
│   ├── Element A1
│   └── Element A2
│
└── Stacking Context B
    ├── Element B1
    └── Element B2
```

The browser first determines the order of the stacking contexts and then determines the order of elements **inside each context**.

### Why does this matter?

Because `z-index` values are primarily compared **within the same stacking context**.

For example:

```css
.parent {
  position: relative;
  z-index: 1;
}

.child {
  position: absolute;
  z-index: 9999;
}
```

The child can have `z-index: 9999`, but it cannot necessarily escape its parent's stacking context and appear above another sibling stacking context with a higher stacking level.

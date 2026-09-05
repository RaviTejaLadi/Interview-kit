# What is CSS Subgrid (`grid-template-columns: subgrid`)?

**CSS Subgrid** allows a nested grid to **reuse the parent grid's tracks** instead of creating its own independent grid.

Without subgrid:

```text
Parent Grid
┌──────────┬──────────┐
│          │          │
│ Child    │ Child    │
│ has its  │ own grid │
└──────────┴──────────┘
```

With subgrid:

```text
Parent Grid
┌──────────┬──────────┐
│ Child    │ Child    │
│          │          │
├──────────┼──────────┤
│ Child uses parent   │
│ grid tracks         │
└─────────────────────┘
```

Example:

```css
/* Define the parent grid */
.parent {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}

/* Make the child reuse the parent's column tracks */
.child {
  display: grid;
  grid-template-columns: subgrid;
}
```

The child now participates in the **same column sizing system** as its parent.

You can also use:

```css
/* Reuse the parent's row tracks */
.child {
  grid-template-rows: subgrid;
}
```

### Why is Subgrid useful?

Consider cards where every card contains:

```text
Title
Description
Button
```

Without subgrid, each card's internal rows can have different sizes.

With `subgrid`, cards can align their internal content to the **same parent-defined tracks**.

**Simple definition:**

> `subgrid` lets a nested grid inherit and participate in its parent's grid tracks, making alignment across nested components much easier.

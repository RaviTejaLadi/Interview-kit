# Implicit grid vs Explicit grid

### Explicit grid

The **explicit grid** is the grid you deliberately define using properties such as:

```css
grid-template-columns
grid-template-rows
grid-template-areas
```

Example:

```css
/* Explicitly define two columns and two rows */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
}
```

You explicitly created:

```text
2 columns
2 rows
```

### Implicit grid

The **implicit grid** is created automatically by the browser when you place more items than your explicitly defined grid can accommodate.

Example:

```css
/* Explicitly define only two columns */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

If you add six items, Grid automatically creates additional **implicit rows** to fit them.

```text
Explicit columns:

┌──────────┬──────────┐
│ Item 1   │ Item 2   │
├──────────┼──────────┤
│ Item 3   │ Item 4   │ ← implicit row
├──────────┼──────────┤
│ Item 5   │ Item 6   │ ← implicit row
└──────────┴──────────┘
```

You can control implicit tracks with:

```css
/* Control automatically generated rows */
.container {
  grid-auto-rows: 150px;
}
```

### Simple distinction

> **Explicit grid** = tracks you define.
> **Implicit grid** = tracks the browser creates automatically.

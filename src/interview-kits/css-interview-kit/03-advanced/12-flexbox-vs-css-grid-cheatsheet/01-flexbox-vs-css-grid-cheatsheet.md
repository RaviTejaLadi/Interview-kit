# Flexbox vs CSS Grid Cheatsheet ⭐⭐⭐⭐⭐

The simplest way to remember the difference:

> **Flexbox = one-dimensional layout.**
> **Grid = two-dimensional layout.**

---

## Flexbox

Flexbox is designed primarily for arranging items along **one axis at a time**.

That axis can be:

```text
Row
→ → → →

or

Column
↓
↓
↓
```

Example:

```css
/* Arrange navigation items horizontally with equal spacing. */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

```text
Home    Products    About    Contact
```

### Common Flexbox properties

**Container:**

```text
display
flex-direction
justify-content
align-items
align-content
flex-wrap
gap
```

**Items:**

```text
flex
flex-grow
flex-shrink
flex-basis
align-self
order
```

---

## CSS Grid

Grid is designed for **rows and columns simultaneously**.

For example:

```text
┌────────┬────────┬────────┐
│        │        │        │
│   1    │   2    │   3    │
├────────┼────────┼────────┤
│        │        │        │
│   4    │   5    │   6    │
└────────┴────────┴────────┘
```

```css
/* Create a three-column grid with consistent gaps. */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

### Common Grid properties

```text
grid-template-columns
grid-template-rows
grid-column
grid-row
grid-area
gap
justify-items
align-items
place-items
```

---

## Flexbox vs Grid

| Feature                | Flexbox          | Grid                  |
| ---------------------- | ---------------- | --------------------- |
| Dimension              | **1D**           | **2D**                |
| Main focus             | Row or column    | Rows **and** columns  |
| Layout control         | Content-oriented | Layout-oriented       |
| Rows                   | Can wrap         | Explicitly controlled |
| Columns                | Limited          | Strong control        |
| Alignment              | Excellent        | Excellent             |
| Complex page layouts   | Possible         | Excellent             |
| Navigation bars        | ⭐⭐⭐⭐⭐            | ⭐⭐⭐                   |
| Card grids             | ⭐⭐⭐              | ⭐⭐⭐⭐⭐                 |
| Page layouts           | ⭐⭐⭐              | ⭐⭐⭐⭐⭐                 |
| Component-level layout | ⭐⭐⭐⭐⭐            | ⭐⭐⭐⭐                  |

---

### Example: Navigation → Flexbox

```css
/* Flexbox is ideal for a single horizontal navigation row. */
.nav {
  display: flex;
  align-items: center;
  gap: 24px;
}
```

```text
Logo    Home    Products    About    Contact
```

You're primarily controlling **one dimension: horizontal**.

---

### Example: Dashboard → Grid

```css
/* Grid controls both the columns and rows of the dashboard. */
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr 300px;
  grid-template-rows: auto 1fr;
  gap: 20px;
}
```

You can explicitly control:

```text
┌──────────┬──────────────────┬──────────┐
│ Sidebar  │      Header      │  Right   │
├──────────┼──────────────────┼──────────┤
│ Sidebar  │      Content     │  Right   │
│          │                  │          │
└──────────┴──────────────────┴──────────┘
```

This is where Grid shines.

---

### Can Flexbox and Grid be used together?

**Absolutely.** In real applications, you often use both.

For example:

```css
/* Grid handles the overall page structure. */
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
}

/* Flexbox handles the navigation inside the sidebar. */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

Think:

```text
Grid
 ↓
Overall page layout

Flexbox
 ↓
Component/internal alignment
```
### 🎯 Interview answer

If asked **"When would you use Flexbox vs Grid?"**, a strong concise answer is:

> **Use Flexbox when I primarily need to arrange and align items in one dimension, such as a navbar or button group. Use CSS Grid when I need control over both rows and columns, such as dashboards, card layouts, or page-level layouts. They are complementary and can be nested together.**

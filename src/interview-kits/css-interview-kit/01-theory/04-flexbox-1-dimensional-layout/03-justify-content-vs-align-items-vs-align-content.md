# `justify-content` vs `align-items` vs `align-content`

These properties are commonly confused.

| Property          | Controls                               | Applies to                   |
| ----------------- | -------------------------------------- | ---------------------------- |
| `justify-content` | Main-axis alignment                    | Flex container               |
| `align-items`     | Cross-axis alignment                   | Flex container               |
| `align-content`   | Cross-axis alignment of multiple lines | Flex container with wrapping |

### `justify-content`

Controls how items are distributed along the **main axis**.

```css
/* Distribute items horizontally when flex-direction is row */
.container {
  display: flex;
  justify-content: space-between;
}
```

Common values:

```text
flex-start
center
flex-end
space-between
space-around
space-evenly
```

### `align-items`

Controls alignment along the **cross axis**.

```css
/* Center items vertically in a row-based Flexbox */
.container {
  display: flex;
  align-items: center;
}
```

### `align-content`

Controls the spacing/alignment of **multiple flex lines** when `flex-wrap: wrap` is used.

```css
/* Align multiple wrapped rows along the cross axis */
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

**Key difference:**

```text
justify-content → items on the main axis
align-items     → items inside one flex line
align-content   → multiple flex lines
```

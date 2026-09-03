# When does margin collapsing NOT happen?

Margin collapsing does not happen in several common situations.

### 1. Flex containers

Margins of flex items don't collapse.

```css
/* Flexbox prevents normal margin collapsing between its children. */
.container {
  display: flex;
  flex-direction: column;
}
```

---

### 2. Grid containers

Margins of grid items don't collapse.

```css
/* Grid layout prevents normal margin collapsing between grid items. */
.container {
  display: grid;
}
```

---

### 3. Absolutely positioned elements

```css
/* Absolutely positioned elements don't participate in normal margin collapsing. */
.box {
  position: absolute;
}
```

---

### 4. Floated elements

```css
/* Floats are outside normal block flow, so their margins don't collapse normally. */
.box {
  float: left;
}
```

---

### 5. Elements that establish a new formatting context

For example:

```css
/* Creates a new block formatting context. */
.parent {
  display: flow-root;
}
```

This can prevent parent/child margin collapsing.

---

### 6. Borders or padding separate the margins

Consider:

```css
/* The padding prevents the child's margin from collapsing through the parent. */
.parent {
  padding-top: 1px;
}

.child {
  margin-top: 20px;
}
```

Because padding exists between the parent and child, their margins don't collapse through that boundary.

### Interview shortcut

Remember:

> **Flex, Grid, positioning, float, padding, and border can prevent margin collapsing.**

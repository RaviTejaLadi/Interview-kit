# What is `flex-basis` vs `width`?

Both can influence an item's size, but they are not the same.

### `width`

Sets the element's width.

```css
/* Set the item's width */
.item {
  width: 200px;
}
```

### `flex-basis`

Sets the item's **initial size along the main axis** before remaining space is distributed.

```css
/* Set the initial main-axis size */
.item {
  flex-basis: 200px;
}
```

For a row:

```text
flex-direction: row
        →
flex-basis controls width
```

For a column:

```text
flex-direction: column
        ↓
flex-basis controls height
```

### Important

When both are specified in a row-based Flexbox:

```css
/* flex-basis generally determines the flex base size */
.item {
  width: 300px;
  flex-basis: 200px;
}
```

The flex algorithm starts from the `flex-basis` value rather than simply treating `width` as the starting size.

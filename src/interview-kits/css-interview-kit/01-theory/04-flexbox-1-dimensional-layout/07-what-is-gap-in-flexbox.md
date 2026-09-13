# What is `gap` in Flexbox?

`gap` creates **consistent spacing between flex items**.

```css
/* Add 20px of space between flex items */
.container {
  display: flex;
  gap: 20px;
}
```

Instead of manually adding margins:

```css
/* Older/manual spacing approach */
.item {
  margin-right: 20px;
}
```

Use:

```css
/* Preferred approach for spacing between flex items */
.container {
  display: flex;
  gap: 20px;
}
```

You can also specify row and column gaps:

```css
/* 10px between rows and 20px between columns */
.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 20px;
}
```

`gap` is usually cleaner because the spacing belongs to the **container**, rather than adding margins to individual children.

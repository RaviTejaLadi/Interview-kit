# How do you align an individual item with `align-self`?

`align-self` overrides the container's `align-items` value for **one specific flex item**.

```css
/* Center all items by default */
.container {
  display: flex;
  align-items: center;
}

/* Move only this item to the start of the cross axis */
.item-special {
  align-self: flex-start;
}
```

For example:

```text
Container: align-items: center

A → center
B → center
C → flex-start
```

Common values include:

```css
align-self: auto;
align-self: flex-start;
align-self: center;
align-self: flex-end;
align-self: stretch;
```

Think of it as:

```text
align-items → rule for all children
align-self  → exception for one child
```

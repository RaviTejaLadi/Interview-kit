# How does `flex-shrink: 0` prevent items from collapsing?

By default:

```css
.item {
  flex-shrink: 1;
}
```

This means the item **can become smaller** if there isn't enough space.

Setting:

```css
/* Prevent this flex item from shrinking */
.item {
  flex-shrink: 0;
}
```

means the Flexbox algorithm will **not shrink that item** to resolve negative free space.

### Example

```css
/* Keep the sidebar at its base size */
.sidebar {
  flex: 0 0 250px;
}
```

Here:

```text
flex-grow: 0
flex-shrink: 0
flex-basis: 250px
```

So the sidebar won't shrink below its flex base size due to flex shrinking.

**Gotcha:** `flex-shrink: 0` does not guarantee that content can never overflow. If the item's content has a minimum size or cannot fit, overflow can still occur.
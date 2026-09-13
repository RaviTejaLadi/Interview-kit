# What does `flex: 1` expand to?

`flex` is a shorthand property for:

```css
flex: grow shrink basis;
```

When you write:

```css
/* Give the item flexible growth */
.item {
  flex: 1;
}
```

It is effectively equivalent to:

```css
/* flex: 1 1 0% */
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

So:

```text
flex: 1
   ↓
flex-grow: 1
flex-shrink: 1
flex-basis: 0%
```

This is commonly used to make multiple items share available space equally.

```css
/* Both items take equal available space */
.container {
  display: flex;
}

.left,
.right {
  flex: 1;
}
```

```text
┌──────────────────────────┐
│       Left    |   Right  │
│         50%   |    50%   │
└──────────────────────────┘
```

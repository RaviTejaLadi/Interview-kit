# What does `margin: auto` do inside a Flex container?

Inside a Flex container, `margin: auto` can consume **available free space**.

This makes it very useful for pushing items apart or centering an item.

### Example: Push an item to the right

```css
/* Push the second item to the far right */
.container {
  display: flex;
}

.right {
  margin-left: auto;
}
```

Result:

```text
┌──────────────────────────────┐
│ Logo                  Profile│
└──────────────────────────────┘
```

The `auto` left margin consumes the available space between the items.

### Example: Center an item

```css
/* Center the item horizontally and vertically */
.container {
  display: flex;
  height: 300px;
}

.item {
  margin: auto;
}
```

Result:

```text
┌──────────────────────┐
│                      │
│        Item          │
│                      │
└──────────────────────┘
```

### Quick rule to remember

```text
margin-left: auto   → push item right
margin-right: auto  → push item left
margin: auto        → consume available space on all sides
```

**Interview shortcut:**
`justify-content` distributes space for the **container's items**, while `margin: auto` can use free space to **push an individual item**.

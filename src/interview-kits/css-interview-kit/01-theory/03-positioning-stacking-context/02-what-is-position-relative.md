# What is `position: relative`?

`relative` keeps the element **in the normal document flow**, but allows you to visually move it using `top`, `right`, `bottom`, or `left`.

The original space occupied by the element is still preserved.

```css
/* The element moves visually but keeps its original space. */
.box {
  position: relative;
  top: 20px;
  left: 30px;
}
```

If the element originally looks like this:

```text
[ Box ]
```

After moving:

```text
      [ Box ]
```

The layout still remembers where the box originally was.

### Important use

`position: relative` is commonly used as the **containing block for an absolutely positioned child**.

```css
/* Parent becomes the positioning reference for the child. */
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
}
```

Here, `.badge` is positioned relative to `.card`.


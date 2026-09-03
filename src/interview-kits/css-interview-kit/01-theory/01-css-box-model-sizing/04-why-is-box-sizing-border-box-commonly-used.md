# Why is `* { box-sizing: border-box; }` commonly used?

Because it makes **element sizing much easier to predict**.

For example, suppose you have:

```css
/* Without border-box, padding and border increase the final width. */
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid black;
}
```

With the default `content-box`:

```text
300 + 40 + 2 = 342px
```

This can cause unexpected overflow, especially in layouts using:

* Flexbox
* CSS Grid
* responsive layouts
* percentage widths

With `border-box`:

```css
/* Apply predictable sizing to every element. */
* {
  box-sizing: border-box;
}
```

Now:

```text
width = 300px
```

Padding and border are included inside that 300px.

### Why developers like it

You can say:

> "I want this element to be exactly 300px wide."

And `border-box` makes that much closer to what you expect.

A common modern reset is:

```css
/* Make sizing predictable and inherit the rule for pseudo-elements. */
*, *::before, *::after {
  box-sizing: border-box;
}
```

# What does `!important` do?

### Definition

`!important` gives a CSS declaration **very high priority in the cascade**, allowing it to override many normal declarations.

```css
/* Force the button to be red */
button {
  color: red !important;
}
```

Even if another normal rule has greater specificity, the `!important` declaration can win.

### Why should you avoid it?

Because it makes CSS harder to maintain.

For example:

```css
/* Force the color */
.button {
  color: red !important;
}
```

Later you might need:

```css
/* This may not override the important declaration */
#app .button {
  color: blue;
}
```

Now you may end up adding more `!important` declarations:

```css
#app .button {
  color: blue !important;
}
```

This creates an **important war**.

### Better approach

Instead of:

```css
/* Avoid unnecessary !important */
.button {
  color: red !important;
}
```

Prefer controlling:

- selector specificity
- source order
- cascade layers
- component styles

Use `!important` when you genuinely need it, such as certain utility classes or deliberate overrides of third-party styles.

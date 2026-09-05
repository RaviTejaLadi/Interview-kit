# What is `repeat()` and `minmax()`?

### `repeat()`

`repeat()` is a CSS Grid function used to **repeat a grid track definition**.

Instead of writing:

```css
/* Define three equal columns manually */
.container {
  grid-template-columns: 1fr 1fr 1fr;
}
```

You can write:

```css
/* Repeat the 1fr column three times */
.container {
  grid-template-columns: repeat(3, 1fr);
}
```

Syntax:

```css
repeat(number, track-size)
```

Example:

```css
/* Create four equal columns */
.container {
  grid-template-columns: repeat(4, 1fr);
}
```

---

### `minmax()`

`minmax()` defines a **minimum and maximum size** for a grid track.

Syntax:

```css
minmax(minimum, maximum)
```

Example:

```css
/* Columns can be at least 200px and grow up to 1fr */
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
}
```

This means:

```text
Minimum size → 200px
Maximum size → 1fr
```

It is particularly useful for responsive layouts.

A very common pattern is:

```css
/* Create responsive columns that never become narrower than 200px */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
```

This lets the browser determine how many columns fit.

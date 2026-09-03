# What are `:is()`, `:where()`, and `:has()`?

These are modern CSS functional pseudo-classes.

---

## `:is()`

`:is()` lets you group multiple selectors.

Instead of:

```css
/* Style headings and paragraphs inside .card */
.card h1,
.card h2,
.card p {
  color: blue;
}
```

You can write:

```css
/* Match h1, h2, or p inside .card */
.card :is(h1, h2, p) {
  color: blue;
}
```

It makes complex selectors easier to read.

---

## `:where()`

`:where()` works similarly to `:is()` but has **zero specificity**.

```css
/* :where() contributes zero specificity */
.card :where(h1, h2, p) {
  color: blue;
}
```

This is useful when creating styles that should be **easy to override**.

---

## `:has()`

`:has()` is often called the **CSS parent selector** because it lets you select an element based on what it contains or is related to.

For example:

```css
/* Select a card that contains an element with the .error class */
.card:has(.error) {
  border: 1px solid red;
}
```

This means:

> Select `.card` if it has an `.error` element inside it.

Another example:

```css
/* Select a label followed by a checked checkbox */
label:has(+ input:checked) {
  font-weight: bold;
}
```

`:has()` is especially useful for state-based UI without JavaScript.

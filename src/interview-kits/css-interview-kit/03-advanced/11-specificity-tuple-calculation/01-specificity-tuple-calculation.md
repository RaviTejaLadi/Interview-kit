# Specificity Tuple Calculation ⭐⭐⭐⭐⭐

**CSS specificity** determines which selector wins when multiple CSS rules target the same element.

A useful way to calculate specificity is with a tuple:

```text
(a, b, c, d)
```

Where:

| Value | Counts                              |
| ----- | ----------------------------------- |
| `a`   | Inline styles                       |
| `b`   | IDs                                 |
| `c`   | Classes, attributes, pseudo-classes |
| `d`   | Elements and pseudo-elements        |

The browser compares the values **from left to right**.

---

### Example 1: Basic calculation

```css
/* Specificity: (0, 1, 0, 0) */
#title {
  color: red;
}

/* Specificity: (0, 0, 1, 0) */
.title {
  color: blue;
}

/* Specificity: (0, 0, 0, 1) */
h1 {
  color: green;
}
```

For:

```html
<!-- The ID selector wins because 1 ID > any number of classes/elements in lower columns. -->
<h1 id="title" class="title">Hello</h1>
```

The winner is:

```text
#title → (0,1,0,0)
```

---

### Example 2: Multiple selectors

```css
/* Specificity: (0, 1, 2, 1) */
#app .card .title h2 {
  color: red;
}
```

Calculate it:

```text
#app       → 1 ID
.card      → 1 class
.title     → 1 class
h2         → 1 element

Specificity = (0,1,2,1)
```

---

### Example 3: Comparing specificity

```css
/* (0,1,0,0) */
#app {
  color: red;
}

/* (0,0,5,0) */
.a.b.c.d.e {
  color: blue;
}
```

Which wins?

```text
#app       → (0,1,0,0)
5 classes  → (0,0,5,0)
```

`#app` wins.

Why?

The browser compares from left to right:

```text
ID column:
1 > 0
```

It doesn't matter that the second selector has five classes.

### Important rule 🧠

> **Specificity is not calculated by simply adding numbers.**

Think lexicographically:

```text
(1, 0, 0, 0)
       ↑
beats

(0, 999, 999, 999)
```

---

### What about `*`?

The universal selector has **zero specificity**.

```css
/* Specificity: (0,0,0,0) */
* {
  margin: 0;
}
```

Combinators such as:

```css
> + ~
```

also contribute **zero specificity**.

---

### What about `:hover`?

A pseudo-class counts in the **class column**.

```css
/* Specificity: (0,0,1,0) */
button:hover {
  color: red;
}
```

`button`:

```text
(0,0,0,1)
```

`:hover`:

```text
(0,0,1,0)
```

Together:

```text
(0,0,1,1)
```

---

### What about `::before`?

Pseudo-elements count in the **element column**.

```css
/* Specificity: (0,0,0,2) */
p::before {
  content: '';
}
```

```text
p          → 1 element
::before   → 1 pseudo-element

= (0,0,0,2)
```

---

### What about `:is()`, `:not()`, and `:has()`?

This is an important interview gotcha.

The pseudo-class itself does **not** add a separate specificity value. The specificity comes from its argument.

```css
/* Specificity is based on the most specific argument: #title */
:is(#title, .title) {
  color: red;
}
```

The effective specificity is:

```text
(0,1,0,0)
```

---

### What about `:where()`?

`:where()` always has **zero specificity**.

```css
/* Specificity: (0,0,0,0) */
:where(#app .card) {
  color: red;
}
```

Even though it contains an ID and a class, `:where()` contributes zero specificity.

### Interview shortcut

```text
Inline → ID → Class/Attribute/Pseudo-class → Element/Pseudo-element
  ↓       ↓              ↓                         ↓
  a       b              c                         d
```

---

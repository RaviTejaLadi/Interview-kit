# Specificity, Cascading & Inheritance

These three concepts control **which CSS rule wins**, **how styles are passed from parent to child**, and **how you can override styles**. Understanding them is important for debugging CSS conflicts.

---

## 1. What is the Cascade in CSS?

### Definition

The **CSS Cascade** is the process the browser uses to decide **which CSS declaration should be applied when multiple rules target the same element/property**.

For example:

```css
/* Set the text color to blue */
p {
  color: blue;
}

/* Set the text color to red */
p {
  color: red;
}
```

Both rules have the same specificity, so the **later rule wins**.

The result is:

```text
red
```

### Main factors in the cascade

A simplified order to remember is:

1. **Origin and importance**
2. **Specificity**
3. **Scoping proximity**
4. **Source order**

For everyday CSS debugging, think:

> **Important/origin → specificity → which rule comes later**

---

## 2. How is CSS Specificity Calculated?

### Definition

**Specificity** is a scoring system that determines which selector has more priority when multiple selectors target the same element.

A useful mental model is:

```text
Inline styles > ID > Class/Attribute/Pseudo-class > Element
```

You can represent specificity as:

```text
Inline   ID   Class   Element
  1       0      0        0
```

More commonly, selectors are compared as a tuple:

```text
(a, b, c, d)
```

Where:

- `a` = inline styles
- `b` = IDs
- `c` = classes, attributes, pseudo-classes
- `d` = elements and pseudo-elements

### Example

```html
<!-- The paragraph receives multiple matching rules -->
<p id="title" class="text">Hello</p>
```

```css
/* Specificity: (0, 0, 1, 0) */
.text {
  color: blue;
}

/* Specificity: (0, 1, 0, 0) */
#title {
  color: red;
}
```

`#title` wins because:

```text
(0, 1, 0, 0) > (0, 0, 1, 0)
```

So the text becomes **red**.

### Common specificity values

| Selector        | Specificity |
| --------------- | ----------: |
| `*`             |   `0-0-0-0` |
| `div`           |   `0-0-0-1` |
| `.box`          |   `0-0-1-0` |
| `[type="text"]` |   `0-0-1-0` |
| `:hover`        |   `0-0-1-0` |
| `#header`       |   `0-1-0-0` |
| Inline style    |   `1-0-0-0` |

---

## 3. What is the Specificity of `*` and Combinators?

### Universal selector `*`

The universal selector has **zero specificity**.

```css
/* Specificity: 0-0-0-0 */
* {
  margin: 0;
}
```

It can select everything, but it doesn't increase specificity.

### Combinators

Combinators also have **zero specificity**.

Examples:

```css
/* Descendant combinator */
div p {
}

/* Child combinator */
div > p {
}

/* Adjacent sibling */
h1 + p {
}

/* General sibling */
h1 ~ p {
}
```

The combinators ` `, `>`, `+`, and `~` don't add specificity.

The specificity comes from the selectors themselves.

For example:

```css
/* Specificity: 0-0-1-2 */
#app .title p {
  color: red;
}
```

Breakdown:

```text
#app    → 1 ID
.title  → 1 class
p       → 1 element

= 0-1-1-1
```

---

## 4. What does `!important` do?

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

---

## 5. What are `:is()`, `:where()`, and `:has()`?

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

---

## 6. Specificity Difference Between `:is()` and `:where()`

This is an important interview question.

### `:is()`

`:is()` takes the **specificity of the most specific selector inside its argument list**.

```css
/* :is() specificity is the highest specificity of its arguments */
:is(p, .title, #header) {
  color: red;
}
```

Specificities:

```text
p       → 0-0-0-1
.title  → 0-0-1-0
#header → 0-1-0-0
```

Therefore:

```text
:is(p, .title, #header)
        ↓
     0-1-0-0
```

---

### `:where()`

`:where()` **always has zero specificity**, regardless of what's inside it.

```css
/* :where() contributes zero specificity */
:where(#header, .title, p) {
  color: red;
}
```

Specificity:

```text
0-0-0-0
```

### Easy way to remember

> **`:is()` has specificity. `:where()` has zero specificity.**

| Selector   | Specificity behavior                               |
| ---------- | -------------------------------------------------- |
| `:is()`    | Uses the most specific argument                    |
| `:where()` | Always `0-0-0-0`                                   |
| `:has()`   | Uses the specificity of its most specific argument |

---

## 7. What is CSS Inheritance?

### Definition

**Inheritance** is the mechanism where certain CSS properties automatically get their computed value from the parent element.

Think of it like this:

```text
body
 └── div
      └── p
           └── span
```

If `body` has:

```css
body {
  color: blue;
}
```

The text inside child elements will generally inherit that `color`.

```html
<!-- The paragraph inherits color from body -->
<body>
  <p>Hello</p>
</body>
```

The paragraph becomes blue even though we didn't explicitly write:

```css
p {
  color: blue;
}
```

---

## Properties that commonly inherit

Examples include:

```css
/* Common inherited properties */
color
font-family
font-size
font-weight
font-style
line-height
text-align
visibility
```

For example:

```css
/* Set common typography for the entire page */
body {
  font-family: Arial, sans-serif;
  color: #333;
}
```

Children generally inherit these values.

---

## Properties that normally don't inherit

Many layout and box-model properties do **not** inherit.

Examples:

```text
margin
padding
border
width
height
display
position
background
```

For example:

```css
/* Padding does not automatically pass to child elements */
.parent {
  padding: 20px;
}
```

The child does **not** automatically receive `padding: 20px`.

### Important

Inheritance and the cascade are different concepts.

**Cascade:**

> Which declaration wins?

**Inheritance:**

> If an element doesn't have its own value, can it receive the value from its parent?

---

## 8. `inherit`, `initial`, `unset`, and `revert`

These are CSS **global values** that let you explicitly control what value a property should use.

---

## `inherit`

### Definition

`inherit` tells an element:

> Use the computed value of this property from my parent.

Example:

```css
/* Set the parent's text color */
.parent {
  color: blue;
}

/* Explicitly inherit the parent's color */
.child {
  color: inherit;
}
```

Result:

```text
.parent → blue
.child  → blue
```

This is useful for properties that normally don't inherit.

---

## `initial`

### Definition

`initial` resets the property to its **CSS-defined initial value**.

Example:

```css
/* Reset color to its initial CSS value */
p {
  color: initial;
}
```

For `color`, the initial value is typically the browser/CSS-defined default color (`CanvasText` in modern CSS terminology), rather than inheriting the parent's color.

Another example:

```css
/* Reset margin to its initial value */
.box {
  margin: initial;
}
```

For `margin`, the initial value is:

```text
0
```

---

## `unset`

### Definition

`unset` behaves differently depending on whether the property is normally inherited.

Think of it as:

```text
If inherited → inherit
If not inherited → initial
```

Example:

```css
/* Remove the explicit color and follow inheritance rules */
.child {
  color: unset;
}
```

Because `color` is inherited:

```text
unset → inherit
```

For `margin`:

```css
/* Reset margin because margin normally does not inherit */
.box {
  margin: unset;
}
```

This behaves like:

```text
margin → initial → 0
```

### Easy rule

> **`unset` = inherit if possible, otherwise initial.**

---

## `revert`

### Definition

`revert` rolls the property back to a value from an **earlier cascade origin/layer**, rather than simply using the property's initial value.

This is particularly useful for undoing author styles and allowing browser/user styles to apply again.

For example:

```css
/* Remove an author's custom button styling and fall back in the cascade */
button {
  all: revert;
}
```

This can be useful when you want an element to behave more like its normal browser/user-agent styling.

### `initial` vs `revert`

This distinction is important.

```css
button {
  display: initial;
}
```

`display`'s initial value is:

```text
inline
```

Whereas:

```css
button {
  display: revert;
}
```

says, roughly:

> Go back to the earlier applicable cascade behavior.

So `revert` can restore browser/user-agent styling that `initial` would not necessarily reproduce.

---

# Quick Comparison

| Value     | Meaning                                              |
| --------- | ---------------------------------------------------- |
| `inherit` | Get the value from the parent                        |
| `initial` | Use the property's CSS initial value                 |
| `unset`   | `inherit` if normally inherited, otherwise `initial` |
| `revert`  | Roll back to an earlier cascade origin/layer         |

### Memory trick 🧠

```text
inherit  → Parent
initial  → CSS default
unset    → Parent OR CSS default
revert   → Earlier cascade
```

---

# 🎯 Interview Cheat Sheet

| Topic           | Key point                                     |
| --------------- | --------------------------------------------- |
| **Cascade**     | Determines which CSS declaration wins         |
| **Specificity** | Determines selector priority                  |
| **Inline**      | Highest normal specificity                    |
| **ID**          | Higher than classes                           |
| **Class**       | Includes `.class`, `[attr]`, `:hover`         |
| **Element**     | `div`, `p`, `h1`, etc.                        |
| `*`             | Zero specificity                              |
| Combinators     | Zero specificity                              |
| `!important`    | Raises declaration priority; use sparingly    |
| `:is()`         | Groups selectors; uses most specific argument |
| `:where()`      | Groups selectors; always zero specificity     |
| `:has()`        | Selects based on a related/contained element  |
| Inheritance     | Child can receive values from parent          |
| `inherit`       | Explicitly inherit                            |
| `initial`       | CSS initial value                             |
| `unset`         | Inherit if inherited, otherwise initial       |
| `revert`        | Roll back to earlier cascade behavior         |

**One especially important correction to the simplified specificity rule:** modern CSS has a few nuances (`:is()`, `:where()`, `:has()`, nesting, cascade layers, scoping), so don't treat specificity as simply “inline > ID > class > element” in every possible situation.

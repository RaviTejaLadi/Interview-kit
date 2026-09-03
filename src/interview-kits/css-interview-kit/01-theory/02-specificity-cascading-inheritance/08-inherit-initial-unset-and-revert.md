# `inherit`, `initial`, `unset`, and `revert`

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

# Specificity Difference Between `:is()` and `:where()`

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

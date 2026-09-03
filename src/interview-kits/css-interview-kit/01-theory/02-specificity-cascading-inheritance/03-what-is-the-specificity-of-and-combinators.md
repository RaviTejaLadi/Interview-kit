# What is the Specificity of `*` and Combinators?

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

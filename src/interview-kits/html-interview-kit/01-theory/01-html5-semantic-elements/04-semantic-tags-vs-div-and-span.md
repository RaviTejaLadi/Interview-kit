# Semantic tags vs `<div>` and `<span>`

### Semantic elements

Semantic elements describe **what the content represents**.

Examples:

```html
<header></header>
<nav></nav>
<main></main>
<article></article>
<section></section>
<footer></footer>
```

### `<div>`

`<div>` is a **generic block-level container**. It has no specific semantic meaning.

Use it when you need a container for layout or grouping and no semantic element is appropriate.

```html
<!-- div is useful when no semantic element fits -->
<div class="card">
  <h2>Product</h2>
  <p>$100</p>
</div>
```

### `<span>`

`<span>` is a **generic inline container** with no semantic meaning.

```html
<!-- span groups inline content without adding meaning -->
<p>Price: <span class="price">$100</span></p>
```

### Quick comparison

| Element     | Meaning             | Typical use             |
| ----------- | ------------------- | ----------------------- |
| `<article>` | Independent content | Blog post, news item    |
| `<section>` | Thematic section    | Chapter/topic area      |
| `<nav>`     | Navigation          | Menus/links             |
| `<div>`     | No semantic meaning | Generic grouping/layout |
| `<span>`    | No semantic meaning | Inline grouping/styling |

**Rule:** Prefer a semantic element when one accurately describes the content. Use `<div>` or `<span>` when you need a generic container.

# `<article>` vs `<section>`: When to use which?

The easiest way to remember the difference:

> **`<article>` = independent content**
> **`<section>` = thematic grouping**

### Use `<article>` when:

The content could make sense **on its own** or be distributed independently.

```html
<!-- Each article can stand independently -->
<article>
  <h2>Understanding JavaScript Closures</h2>
  <p>A closure is a function together with its surrounding state.</p>
</article>

<article>
  <h2>Understanding JavaScript Promises</h2>
  <p>Promises represent the eventual result of an asynchronous operation.</p>
</article>
```

### Use `<section>` when:

You are grouping related content within a larger page or article.

```html
<!-- Sections organize related topics within an article -->
<article>
  <h1>Learning JavaScript</h1>

  <section>
    <h2>Variables</h2>
    <p>JavaScript supports let, const, and var.</p>
  </section>

  <section>
    <h2>Functions</h2>
    <p>Functions are reusable blocks of code.</p>
  </section>
</article>
```

### Interview shortcut

Ask yourself:

**"Can this content stand independently?"**

- **Yes → `<article>`**
- **No, it's a thematic part of something larger → `<section>`**

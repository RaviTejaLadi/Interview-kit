# Markup a semantic blog article

A semantic blog article uses `<article>` because a blog post is generally **self-contained content that could stand on its own**.

Use:

- `<article>` → complete blog post
- `<header>` → article introduction
- `<h1>` → article title
- `<time datetime="">` → machine-readable publication date
- `<address>` → author/contact information when appropriate
- `<footer>` → tags and other article metadata

```html
<!-- Semantic blog article with author, publication date, headings, and tags -->
<article>
  <header>
    <h1>Understanding Modern JavaScript</h1>

    <p>
      By
      <address>
        <a href="/authors/ravi">Ravi Teja</a>
      </address>
    </p>

    <p>
      Published
      <time datetime="2026-09-10">September 10, 2026</time>
    </p>
  </header>

  <section aria-labelledby="introduction">
    <h2 id="introduction">Introduction</h2>
    <p>
      JavaScript provides many features for building modern web applications.
    </p>
  </section>

  <section aria-labelledby="key-concepts">
    <h2 id="key-concepts">Key Concepts</h2>

    <h3>Asynchronous JavaScript</h3>
    <p>Promises and async/await help manage asynchronous operations.</p>

    <h3>Modules</h3>
    <p>ES modules allow JavaScript code to be organized into reusable files.</p>
  </section>

  <footer>
    <p>Tags:</p>
    <ul>
      <li><a href="/tags/javascript">JavaScript</a></li>
      <li><a href="/tags/web-development">Web Development</a></li>
      <li><a href="/tags/frontend">Frontend</a></li>
    </ul>
  </footer>
</article>
```

### Heading hierarchy

A good structure is:

```text
h1  Blog post title
 ├── h2  Introduction
 └── h2  Key Concepts
      ├── h3  Asynchronous JavaScript
      └── h3  Modules
```

The hierarchy should represent the **document structure**, rather than choosing headings based on their visual size.

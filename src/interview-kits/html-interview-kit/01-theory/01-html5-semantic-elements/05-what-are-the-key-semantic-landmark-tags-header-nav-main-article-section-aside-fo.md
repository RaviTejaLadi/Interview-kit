# What are the key semantic landmark tags?

These elements help describe the major structure of a webpage.

### `<header>`

Represents introductory content for a page or section.

```html
<!-- Page header containing the website title -->
<header>
  <h1>My Blog</h1>
</header>
```

It can contain:

- Logo
- Heading
- Introductory content
- Navigation

---

### `<nav>`

Represents a section containing **navigation links**.

```html
<!-- Primary site navigation -->
<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
</nav>
```

Use it for major navigation, not necessarily every group of links.

---

### `<main>`

Represents the **primary content** of the document.

```html
<!-- Main content of the page -->
<main>
  <h1>HTML Tutorial</h1>
  <p>Learn HTML fundamentals.</p>
</main>
```

A document should generally have **one `<main>` element**.

---

### `<article>`

Represents **self-contained, independently distributable content**.

Examples:

- Blog post
- News article
- Product review
- Forum post

```html
<!-- Independent blog article -->
<article>
  <h2>What is React?</h2>
  <p>React is a JavaScript library for building user interfaces.</p>
</article>
```

---

### `<section>`

Represents a **thematic grouping of content**.

```html
<!-- Thematic section of the page -->
<section>
  <h2>HTML Features</h2>
  <p>HTML provides semantic elements and multimedia support.</p>
</section>
```

A `<section>` generally should have a heading.

---

### `<aside>`

Represents content that is **indirectly related** to the main content.

Examples:

- Sidebar
- Related articles
- Advertisements
- Author information

```html
<!-- Related content displayed beside the main article -->
<aside>
  <h2>Related Articles</h2>
  <a href="/css">Learn CSS</a>
</aside>
```

---

### `<footer>`

Represents footer information for a page or section.

```html
<!-- Website footer -->
<footer>
  <p>© 2026 My Website</p>
</footer>
```

It may contain:

- Copyright information
- Contact information
- Related links
- Author information

### Typical page structure

```text
<body>
│
├── <header>
│
├── <nav>
│
├── <main>
│   ├── <article>
│   └── <section>
│
├── <aside>
│
└── <footer>
</body>
```

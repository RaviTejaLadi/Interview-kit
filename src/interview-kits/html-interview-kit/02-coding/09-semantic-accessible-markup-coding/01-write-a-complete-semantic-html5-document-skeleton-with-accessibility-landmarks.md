# Write a complete, semantic HTML5 document skeleton with accessibility landmarks

A **semantic HTML5 document skeleton** uses meaningful HTML elements to describe the structure and purpose of the page. Accessibility landmarks such as `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` help screen-reader users navigate the page efficiently.

```html
<!-- Complete semantic HTML5 document with accessibility landmarks -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A semantic HTML5 webpage example" />
    <title>My Website</title>
  </head>

  <body>
    <header>
      <h1>My Website</h1>

      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>

    <main>
      <section aria-labelledby="welcome-heading">
        <h2 id="welcome-heading">Welcome</h2>
        <p>This is the main content of the page.</p>
      </section>

      <aside aria-label="Related information">
        <h2>Related Links</h2>
        <a href="/blog">Blog</a>
      </aside>
    </main>

    <footer>
      <p>&copy; 2026 My Website</p>
    </footer>
  </body>
</html>
```

### Important landmarks

| Element     | Purpose                      |
| ----------- | ---------------------------- |
| `<header>`  | Introductory content/header  |
| `<nav>`     | Major navigation links       |
| `<main>`    | Primary content of the page  |
| `<section>` | Thematic grouping of content |
| `<aside>`   | Related/supporting content   |
| `<footer>`  | Footer information           |

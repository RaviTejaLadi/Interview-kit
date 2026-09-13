# What is a favicon and how do you configure it?

A **favicon** is a small icon associated with a website.

It can appear in places such as:

- Browser tabs
- Bookmarks
- Browser history
- Other browser UI

You configure it using `<link>` inside `<head>`.

Example:

```html id="kq9w6j"
<!-- Configure the website favicon -->
<link rel="icon" href="/favicon.ico" />
```

You can also use PNG:

```html id="x2j7v0"
<!-- Use a PNG favicon -->
<link rel="icon" type="image/png" href="/favicon.png" />
```

For SVG:

```html id="r7f3k2"
<!-- Use an SVG favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### Apple touch icon

For Apple devices, you may also provide:

```html id="c7n0tq"
<!-- Provide an icon for Apple home-screen bookmarks -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### Typical `<head>` example

```html id="5w2h9s"
<!-- Configure common document metadata and icons -->
<head>
  <meta charset="UTF-8" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>React Tutorial</title>

  <meta name="description" content="Learn React with practical examples." />

  <link rel="canonical" href="https://example.com/react" />

  <link rel="icon" type="image/png" href="/favicon.png" />

  <meta property="og:title" content="React Tutorial" />

  <meta property="og:description" content="Learn React with practical examples." />

  <meta property="og:image" content="https://example.com/react-cover.jpg" />

  <meta property="og:url" content="https://example.com/react" />
</head>
```

# Quick Interview Cheat Sheet ⭐

| Topic             | Short definition                                   |
| ----------------- | -------------------------------------------------- |
| `<head>`          | Contains document metadata and resource references |
| Viewport meta     | Configures the mobile viewport and initial scaling |
| `rel="canonical"` | Identifies the preferred URL for a page            |
| `og:*`            | Controls social sharing metadata using Open Graph  |
| `twitter:*`       | Controls X/Twitter card metadata                   |
| Favicon           | Small website icon shown in browser UI             |

### Easy way to remember

```text id="6o6f0g"
<head>
 │
 ├── <title>       → Page title
 ├── <meta>        → Page metadata
 ├── canonical     → Preferred URL
 ├── og:*          → Social sharing
 ├── twitter:*     → X/Twitter sharing
 ├── <link>        → External resources
 └── favicon       → Website icon
```

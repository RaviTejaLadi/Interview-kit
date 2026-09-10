# What are Twitter Card meta tags?

**Twitter Card tags** are metadata that control how URLs are displayed when shared on **X (formerly Twitter)**.

They use the `twitter:` prefix.

Example:

```html id="xv3f1f"
<!-- Configure the social preview for X/Twitter -->
<meta
  name="twitter:card"
  content="summary_large_image"
/>

<meta
  name="twitter:title"
  content="Learn React Hooks"
/>

<meta
  name="twitter:description"
  content="A practical guide to React Hooks."
/>

<meta
  name="twitter:image"
  content="https://example.com/react-cover.jpg"
/>
```

### Common Twitter Card properties

| Property              | Purpose              |
| --------------------- | -------------------- |
| `twitter:card`        | Defines card type    |
| `twitter:title`       | Card title           |
| `twitter:description` | Card description     |
| `twitter:image`       | Card image           |
| `twitter:site`        | Associated X account |

A common card type is:

```html id="0m5z7x"
<!-- Use a large image preview for the social card -->
<meta
  name="twitter:card"
  content="summary_large_image"
/>
```

### Open Graph vs Twitter Cards

```text id="0f4mbe"
Open Graph
    ↓
og:title
og:image
og:description

Twitter/X
    ↓
twitter:card
twitter:title
twitter:image
twitter:description
```

In practice, social platforms may use Open Graph metadata as fallback when platform-specific metadata isn't provided, but behavior can vary.

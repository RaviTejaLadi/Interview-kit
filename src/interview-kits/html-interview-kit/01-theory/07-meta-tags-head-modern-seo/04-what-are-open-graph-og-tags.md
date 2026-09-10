# What are Open Graph (`og:*`) tags?

**Open Graph tags** are metadata used primarily by social platforms and other services to control how a webpage appears when its URL is shared.

They use the `og:` prefix.

Example:

```html id="2p3y5w"
<!-- Define how the page should appear when shared on social platforms -->
<meta property="og:title" content="Learn React Hooks" />

<meta
  property="og:description"
  content="A practical guide to React Hooks."
/>

<meta
  property="og:image"
  content="https://example.com/react-cover.jpg"
/>

<meta
  property="og:url"
  content="https://example.com/react-hooks"
/>

<meta property="og:type" content="article" />
```

When someone shares the URL, the platform can use this information to generate a preview.

Conceptually:

```text id="7u1nqg"
URL
 ↓
Open Graph metadata
 ↓
┌─────────────────────────┐
│ Learn React Hooks       │
│ A practical guide...    │
│                         │
│       [Image]           │
└─────────────────────────┘
```

### Common Open Graph properties

| Property         | Purpose                 |
| ---------------- | ----------------------- |
| `og:title`       | Title of shared content |
| `og:description` | Description             |
| `og:image`       | Preview image           |
| `og:url`         | Canonical/share URL     |
| `og:type`        | Content type            |
| `og:site_name`   | Website name            |

### Important

Open Graph metadata primarily controls **social sharing previews**. It isn't a replacement for normal SEO metadata such as `<title>` and `meta name="description"`.

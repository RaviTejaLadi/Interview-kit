# Resource hints: `preconnect` and `preload`

**Resource hints** tell the browser about resources it is likely to need so it can optimize network activity.

### `preconnect`

`preconnect` tells the browser to establish a connection to another origin early.

This can reduce connection setup time for resources such as fonts or CDN assets.

### `preload`

`preload` tells the browser:

> "This resource is important and will be needed soon, so start fetching it early."

It is commonly useful for **critical fonts, hero images, or other resources needed during initial rendering**.

### Google Fonts example

```html
<!-- Establish the connection early and preload a critical font stylesheet -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

For a self-hosted critical font, `preload` can be more directly useful:

```html
<!-- Preload a critical self-hosted font needed for initial rendering -->
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin />
```

### Critical hero image

```html
<!-- Preload the critical hero image so it can be fetched earlier -->
<link rel="preload" as="image" href="/images/hero.webp" type="image/webp" />
```

### Easy distinction

| Hint         | Purpose                                   |
| ------------ | ----------------------------------------- |
| `preconnect` | Establish the connection early            |
| `preload`    | Fetch a specific important resource early |
| `prefetch`   | Fetch a resource that may be needed later |

> Don't preload everything. Overusing `preload` can compete with other critical resources and hurt performance.

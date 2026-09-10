# Responsive `<picture>` with AVIF, WebP, and JPEG fallback

The **`<picture>` element** allows you to provide different image sources depending on browser support, format, or screen conditions.

A common modern strategy is:

**AVIF → WebP → JPEG fallback**

* **AVIF** → usually excellent compression and quality.
* **WebP** → widely supported modern format.
* **JPEG** → fallback for older/unsupported browsers.
* `loading="lazy"` → tells the browser to defer loading images that are not immediately needed.

```html
<!-- Serve AVIF first, WebP second, and JPEG as the final fallback -->
<picture>
  <source
    srcset="/images/hero.avif"
    type="image/avif"
  />

  <source
    srcset="/images/hero.webp"
    type="image/webp"
  />

  <img
    src="/images/hero.jpg"
    alt="Team working together in an office"
    width="1200"
    height="675"
    loading="lazy"
    decoding="async"
  />
</picture>
```

### Important

The `<img>` element is still required inside `<picture>` because it provides the fallback and the actual rendered image element.

For a **critical above-the-fold hero/LCP image**, don't blindly use `loading="lazy"`; eager loading or `fetchpriority="high"` may be more appropriate.
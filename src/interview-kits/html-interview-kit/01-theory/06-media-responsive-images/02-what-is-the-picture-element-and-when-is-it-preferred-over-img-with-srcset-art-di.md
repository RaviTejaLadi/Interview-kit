# What is `<picture>` and when is it preferred over `<img>` with `srcset`?

`<picture>` allows you to provide **different image resources based on conditions such as viewport size, media queries, or image format support**.

It is especially useful for **Art Direction**.

## Resolution Switching

**Resolution switching** means:

> Same image/content, but different resolutions or file sizes.

Use `<img>` with `srcset`:

```html
<!-- Resolution switching: same image at different resolutions -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="100vw"
  alt="City skyline"
/>
```

The image composition stays the same.

---

## Art Direction

**Art direction** means:

> Use a different image or crop depending on the viewport or context.

Use `<picture>`:

```html
<!-- Art direction: use a different crop on smaller screens -->
<picture>
  <source media="(max-width: 600px)" srcset="portrait-crop.jpg" />

  <source media="(min-width: 601px)" srcset="landscape-crop.jpg" />

  <img src="landscape-crop.jpg" alt="Person standing near a mountain" />
</picture>
```

The mobile and desktop versions can have completely different compositions.

### `<picture>` is also useful for image formats

For example:

```html
<!-- Serve AVIF when supported, otherwise fall back to WebP/JPEG -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />

  <img src="image.jpg" alt="Product" />
</picture>
```

### Easy interview rule ⭐

```text
Same image, different resolution
        ↓
<img> + srcset + sizes

Different crop/composition
        ↓
<picture>

Different image format
        ↓
<picture> + <source type="...">
```

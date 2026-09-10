# What is native image lazy loading (`loading="lazy"`)?

**Native lazy loading** allows the browser to delay loading an image until it is reasonably close to the user's viewport.

Use:

```html
<!-- Delay loading until the image is near the viewport -->
<img
  src="large-image.jpg"
  loading="lazy"
  alt="Mountain landscape"
/>
```

Instead of downloading every image immediately:

```text
Page loads
   ↓
Images near viewport → Load
Images far away      → Delay
   ↓
User scrolls
   ↓
More images → Load
```

### Benefits

* Reduces initial network requests
* Saves bandwidth
* Improves initial page loading
* Useful for long pages
* Can improve performance on mobile devices

### Important

Don't blindly lazy-load every image.

Images that are immediately visible, especially important **hero/LCP images**, generally should not be lazy-loaded.

```html
<!-- Above-the-fold hero image should generally load eagerly -->
<img
  src="hero.jpg"
  alt="Product"
  width="1200"
  height="600"
/>
```
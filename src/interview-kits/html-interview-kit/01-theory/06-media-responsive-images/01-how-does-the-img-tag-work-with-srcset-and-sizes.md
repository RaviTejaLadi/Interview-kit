# How does `<img>` work with `srcset` and `sizes`?

`srcset` allows you to provide **multiple versions of an image**, so the browser can choose the most appropriate one based on the device and layout.

`sizes` tells the browser **how much space the image will occupy in the layout** when using width-descriptor (`w`) candidates in `srcset`.

### Example

```html
<!-- Let the browser choose the most appropriate image for the rendered size -->
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    50vw
  "
  alt="Mountain landscape"
/>
```

### How it works

Suppose:

* Mobile screen → image occupies `100vw`
* Desktop screen → image occupies `50vw`

The browser considers:

* Viewport size
* Device pixel ratio
* `sizes`
* Available `srcset` candidates

and selects an appropriate image.

### `srcset`

Think of `srcset` as:

> **"Here are different image versions you can choose from."**

```text
400w  → Small image
800w  → Medium image
1200w → Large image
```

### `sizes`

Think of `sizes` as:

> **"This is approximately how wide the image will appear in the layout."**

### Important

`srcset` with `w` descriptors and `sizes` work together. If you use pixel-density descriptors such as `1x` and `2x`, `sizes` is not used.

```html
<!-- Pixel-density candidates do not use the sizes attribute -->
<img
  src="logo.png"
  srcset="logo.png 1x, logo@2x.png 2x"
  alt="Company logo"
/>
```
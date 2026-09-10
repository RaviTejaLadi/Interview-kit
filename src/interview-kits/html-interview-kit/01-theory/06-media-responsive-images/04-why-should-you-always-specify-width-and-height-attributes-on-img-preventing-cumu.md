# Why should you specify `width` and `height` on `<img>`?

You should specify the intrinsic `width` and `height` attributes because the browser can calculate the image's **aspect ratio before the image finishes downloading**.

This helps prevent **Cumulative Layout Shift (CLS)**.

Without dimensions:

```html
<!-- Without dimensions, the browser may not know the final layout space in advance -->
<img src="banner.jpg" alt="Banner" />
```

The browser initially doesn't know how much vertical space the image will need.

When the image loads:

```text
Before image loads:

Text
Text
Text

Image loads
   ↓
Text moves down
```

This creates a **layout shift**.

With dimensions:

```html
<!-- Dimensions reserve the correct aspect-ratio space before the image loads -->
<img
  src="banner.jpg"
  width="1200"
  height="600"
  alt="Banner"
/>
```

The browser knows the aspect ratio:

```text
1200 : 600
     ↓
  2 : 1
```

It can reserve the appropriate space before the image arrives.

### Responsive images

You can still make the image responsive with CSS:

```css id="v0n8gj"
/* Keep the image responsive while preserving its intrinsic aspect ratio. */
img {
  max-width: 100%;
  height: auto;
}
```

### Important interview point ⭐

`width` and `height` don't necessarily mean the image must always render at those exact CSS dimensions.

They provide **intrinsic dimensions/aspect-ratio information**, which helps the browser reserve space.
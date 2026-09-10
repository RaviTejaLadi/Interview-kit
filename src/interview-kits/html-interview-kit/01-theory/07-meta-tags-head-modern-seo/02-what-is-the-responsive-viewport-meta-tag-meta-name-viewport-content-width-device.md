# What is the responsive viewport meta tag?

The viewport meta tag tells mobile browsers **how to control the page's viewport and initial scaling**.

The common version is:

```html id="0jyd2v"
<!-- Configure the viewport for responsive layouts -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>
```

### `width=device-width`

Tells the browser:

> Make the viewport width equal to the device's CSS viewport width.

Without this, mobile browsers may use a wider virtual viewport and scale the page down, making responsive layouts behave incorrectly.

### `initial-scale=1.0`

Specifies the initial zoom level.

```text id="yr3e8n"
width=device-width
        ↓
Use device's viewport width

initial-scale=1.0
        ↓
Start at 100% zoom
```

This is important for responsive CSS:

```css id="v4iqkg"
/* Example responsive layout */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
```

### Interview answer ⭐

> The viewport meta tag tells mobile browsers how to size and scale the page's viewport so responsive CSS layouts work as intended.
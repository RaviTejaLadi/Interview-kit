# Modern viewport units: `dvh`, `lvh`, `svh`

Traditional:

```css
height: 100vh;
```

means approximately **100% of the viewport height**, but mobile browsers have dynamic browser UI such as address bars and toolbars.

As those UI elements appear/disappear, the usable viewport can change.

This can cause a `100vh` element to be **too tall** or create unwanted scrolling on mobile.

### `svh` — Small Viewport Height

`svh` represents the **small viewport height**.

It is useful when you want to ensure content fits even when browser UI takes up more space.

```css id="l2r5e9"
/* Use the smallest viewport height */
.hero {
  min-height: 100svh;
}
```

### `lvh` — Large Viewport Height

`lvh` represents the **large viewport height**, generally corresponding to the viewport when browser UI is minimized.

```css id="z8m4q1"
/* Use the large viewport height */
.hero {
  min-height: 100lvh;
}
```

### `dvh` — Dynamic Viewport Height

`dvh` changes dynamically as the browser's UI expands or collapses.

```css id="0b7x6c"
/* Adapt dynamically to changes in the mobile browser viewport */
.hero {
  min-height: 100dvh;
}
```

### Quick comparison

| Unit  | Meaning                 |
| ----- | ----------------------- |
| `svh` | Small viewport height   |
| `lvh` | Large viewport height   |
| `dvh` | Dynamic viewport height |

For many modern full-screen mobile layouts:

```css id="z5e8p2"
/* Make a section track the currently available viewport height */
.page {
  min-height: 100dvh;
}
```

is a better starting point than `100vh`.

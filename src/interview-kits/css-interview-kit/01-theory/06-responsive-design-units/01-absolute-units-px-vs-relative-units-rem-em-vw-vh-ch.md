# Absolute units (`px`) vs Relative units (`rem`, `em`, `%`, `vw`, `vh`, `ch`)

### Absolute units — `px`

`px` represents a CSS pixel. It is generally a fixed-size unit and does not depend directly on the parent element's font size.

```css id="q4h5k2"
/* Set a fixed width and font size */
.card {
  width: 300px;
  font-size: 16px;
}
```

### Relative units

Relative units calculate their size based on another value.

| Unit  | Relative to                                            | Common use                |
| ----- | ------------------------------------------------------ | ------------------------- |
| `rem` | Root (`html`) font size                                | Typography, spacing       |
| `em`  | Current/parent font size depending on property/context | Component-relative sizing |
| `%`   | A relevant parent/container dimension                  | Widths, flexible layouts  |
| `vw`  | 1% of viewport width                                   | Viewport-based sizing     |
| `vh`  | 1% of viewport height                                  | Viewport-based sizing     |
| `ch`  | Width of the `0` character in the element's font       | Text width                |

### Example

```css id="1c7n4r"
/* Use different relative units */
.title {
  font-size: 2rem;
}

.container {
  width: 80%;
}

.hero {
  width: 100vw;
  height: 50vh;
}

.article {
  max-width: 65ch;
}
```

### Simple rule

- `px` → fixed/predictable size
- `rem` → relative to root font size
- `em` → relative to font size
- `%` → relative to a containing/reference dimension
- `vw` → viewport width
- `vh` → viewport height
- `ch` → approximately character-based width

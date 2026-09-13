# What creates a new Stacking Context?

There are several ways to create a stacking context.

The ones you mentioned are important:

### `opacity < 1`

```css
/* Creates a new stacking context because opacity is less than 1. */
.card {
  opacity: 0.9;
}
```

`opacity: 1` does not create one merely because the property exists.

---

### `transform`

```css
/* A non-none transform creates a stacking context. */
.card {
  transform: translateX(10px);
}
```

Even:

```css
transform: translateZ(0);
```

can create a stacking context.

---

### `filter`

```css
/* A non-none filter creates a stacking context. */
.card {
  filter: blur(0);
}
```

---

### `isolation: isolate`

This explicitly creates a new stacking context.

```css
/* Explicitly isolates this element into its own stacking context. */
.component {
  isolation: isolate;
}
```

This is particularly useful when you want to prevent internal stacking behavior from interfering with surrounding content.

### Other common stacking-context creators

You should also know:

- Positioned element with a non-`auto` `z-index`
- `position: fixed`
- `position: sticky`
- Flex/grid item with non-`auto` `z-index`
- `opacity < 1`
- `transform` other than `none`
- `filter` other than `none`
- `isolation: isolate`
- Certain `contain` values
- `will-change` in relevant cases
- Some newer CSS properties/features

So don't memorize only four properties.

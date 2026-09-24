# Are Tailwind breakpoints mobile-first (`min-width`) or desktop-first (`max-width`)?

Tailwind's responsive system is **mobile-first**.

Responsive prefixes use **`min-width` media queries**.

For example:

```html
<!-- Stack on smaller screens and switch to columns at md -->
<div class="flex flex-col md:flex-row">...</div>
```

Conceptually:

```css
/* Base/mobile styles */
display: flex;
flex-direction: column;

/* md and above */
@media (min-width: 768px) {
  flex-direction: row;
}
```

So the pattern is:

```text
Base styles
    ↓
sm:
    ↓
md:
    ↓
lg:
    ↓
xl:
    ↓
2xl:
```

Each breakpoint progressively enhances the layout.

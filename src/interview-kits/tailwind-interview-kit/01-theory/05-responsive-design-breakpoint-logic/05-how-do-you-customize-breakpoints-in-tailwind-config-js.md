# How do you customize breakpoints in `tailwind.config.js`?

In **Tailwind v3**, customize breakpoints through `theme.screens`.

```js
// Add custom responsive breakpoints to a Tailwind v3 configuration
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '3xl': '1920px',
      },
    },
  },
};
```

Now you can use:

```html
<!-- Use the custom xs and 3xl breakpoints -->
<div class="text-sm xs:text-base 3xl:text-2xl">Responsive text</div>
```

### Add vs replace

Using:

```js
// Add custom breakpoints while preserving the defaults
theme: {
  extend: {
    screens: {
      xs: "480px",
    },
  },
}
```

adds `xs` while keeping:

```text
sm
md
lg
xl
2xl
```

If you define `screens` directly:

```js
// Replace the screen configuration with only these breakpoints
theme: {
  screens: {
    tablet: "768px",
    desktop: "1200px",
  },
}
```

you're defining your own screen configuration rather than extending the defaults.

### Tailwind v4 note

Tailwind v4 uses a CSS-first configuration approach. Breakpoints can be customized using theme variables such as:

```css
/* Define a custom breakpoint in Tailwind v4 */
@import 'tailwindcss';

@theme {
  --breakpoint-xs: 30rem;
}
```

So if you're learning Tailwind today, know both the **v3 `tailwind.config.js` approach** and the **v4 CSS-first approach**.

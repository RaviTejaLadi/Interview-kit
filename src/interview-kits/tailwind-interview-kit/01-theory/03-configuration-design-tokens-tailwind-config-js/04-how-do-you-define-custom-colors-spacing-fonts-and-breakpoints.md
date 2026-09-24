# How do you define custom colors, spacing, fonts, and breakpoints?

You normally use `theme.extend`.

## Custom colors

```js
// Add custom brand colors while preserving Tailwind defaults
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: "#6366f1",
        success: "#22c55e",
        danger: "#ef4444",
      },
    },
  },
};
```

Usage:

```html
<!-- Use the custom color utilities -->
<button class="bg-brand text-white">
  Save
</button>
```

You can also define shades:

```js
// Define a custom color scale
colors: {
  brand: {
    50: "#eef2ff",
    500: "#6366f1",
    700: "#4338ca",
  },
}
```

Then:

```html
<!-- Use a specific custom shade -->
<div class="bg-brand-500 text-brand-700">
  Hello
</div>
```

---

## Custom spacing

```js
// Add custom spacing tokens to Tailwind's spacing scale
module.exports = {
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
};
```

Usage:

```html
<!-- Use the custom spacing tokens -->
<div class="p-18 mt-22">
  Content
</div>
```

---

## Custom fonts

```js
// Add custom font families to the Tailwind theme
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
};
```

Usage:

```html
<!-- Apply the custom font families -->
<h1 class="font-display">
  Welcome
</h1>
```

---

## Custom breakpoints

```js
// Add custom responsive breakpoints
module.exports = {
  theme: {
    extend: {
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
    },
  },
};
```

Usage:

```html
<!-- Change layout at the custom breakpoints -->
<div class="text-sm xs:text-base 3xl:text-xl">
  Responsive text
</div>
```

### Important distinction

A breakpoint doesn't mean:

> "Make this element responsive."

It means:

> "Apply this utility when the viewport reaches this width."

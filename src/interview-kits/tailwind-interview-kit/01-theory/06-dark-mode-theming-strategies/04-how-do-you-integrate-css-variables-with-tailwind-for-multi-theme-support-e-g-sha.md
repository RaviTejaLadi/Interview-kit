# How do you integrate CSS variables with Tailwind for multi-theme support (e.g., shadcn/ui approach)?

This is a very useful pattern for larger applications.

Instead of hardcoding:

```html
<!-- Hardcoded light/dark colors -->
<div class="bg-white dark:bg-gray-900">
```

you can define semantic CSS variables:

```css
/* Define semantic design tokens for the default theme */
:root {
  --background: 255 255 255;
  --foreground: 15 23 42;
}

/* Override the same tokens for the dark theme */
.dark {
  --background: 15 23 42;
  --foreground: 248 250 252;
}
```

Then use those variables through Tailwind.

Conceptually:

```text
Component
   ↓
bg-background
   ↓
--background
   ↓
Light → white
Dark  → dark
```

This is the general approach popularized by **shadcn/ui**.

---

## Example with Tailwind v3

You can define colors using CSS variables:

```js
// Map Tailwind color utilities to CSS variables
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
};
```

Then:

```css
/* Define light and dark theme tokens */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

And your React component becomes:

```jsx
// Use semantic theme tokens instead of hardcoded colors
function Card() {
  return (
    <div className="bg-background text-foreground">
      <h2>Dashboard</h2>
    </div>
  );
}
```

Notice something important:

**The component doesn't know whether it's light or dark.**

It simply says:

```text
background
foreground
```

The theme decides what those values mean.

---

## Why this is better for multiple themes

Suppose you have:

```text
Light
Dark
Blue
High Contrast
Brand A
Brand B
```

You can change the variables:

```css
/* Theme-specific token values */
.theme-blue {
  --primary: 59 130 246;
}

.theme-green {
  --primary: 34 197 94;
}
```

The component can remain:

```jsx
// The component consumes the semantic token
<button className="bg-primary text-primary-foreground">
  Save
</button>
```

This is essentially a **design-token architecture**.

### Hardcoded approach

```text
Component
 ├── bg-white
 ├── dark:bg-gray-900
 ├── text-gray-900
 └── dark:text-white
```

### Token approach

```text
Component
      ↓
Semantic token
      ↓
CSS variable
      ↓
Current theme
```

This scales much better when your application has many themes.

# What is `tailwind.config.js` and what is its role?

`tailwind.config.js` is the configuration file used by Tailwind CSS to customize how Tailwind generates your CSS.

In Tailwind v3, it commonly contains:

- `content` — files Tailwind scans
- `theme` — design tokens such as colors, spacing, fonts, breakpoints
- `plugins` — Tailwind plugins
- `variants` — variant customization in older Tailwind versions
- `darkMode` — dark-mode strategy
- `corePlugins` — enabling/disabling core features

Example:

```js
// Configure Tailwind's source files and design tokens
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: "#6366f1",
      },
    },
  },

  plugins: [],
};
```

Think of it as the **configuration layer for your design system**.

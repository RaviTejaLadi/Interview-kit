# How do you style form elements and inputs cleanly in dark mode?

Form controls need special attention because browsers can apply their own native styling.

A basic Tailwind input might look like:

```html
<!-- Style the input for both light and dark themes -->
<input
  type="text"
  placeholder="Enter your name"
  class="
    w-full
    rounded-md
    border
    border-gray-300
    bg-white
    px-3
    py-2
    text-gray-900
    placeholder-gray-500
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500
    dark:border-gray-700
    dark:bg-gray-900
    dark:text-white
    dark:placeholder-gray-400
  "
/>
```

The important parts are:

```text
bg-white
dark:bg-gray-900

text-gray-900
dark:text-white

placeholder-gray-500
dark:placeholder-gray-400

border-gray-300
dark:border-gray-700
```

---

## Checkboxes and radio buttons

Native controls can behave differently across browsers and operating systems.

You can use Tailwind's `accent-*` utilities:

```html
<!-- Use a theme-aware accent color for a native checkbox -->
<input type="checkbox" class="accent-blue-600 dark:accent-blue-400" />
```

---

## Select elements

```html
<!-- Style a select consistently across themes -->
<select
  class="
    rounded-md
    border
    border-gray-300
    bg-white
    px-3
    py-2
    text-gray-900
    dark:border-gray-700
    dark:bg-gray-900
    dark:text-white
  "
>
  <option>React</option>
  <option>Vue</option>
  <option>Svelte</option>
</select>
```

---

## Using `@tailwindcss/forms`

For larger applications, the official **`@tailwindcss/forms`** plugin can provide a more consistent baseline for form controls.

The idea is:

```text
Browser defaults
       ↓
Forms plugin normalization
       ↓
Tailwind utilities
       ↓
Your light/dark styling
```

You still need to specify your application's colors and states.

---

# 🌙 Recommended architecture for a React application

For a small application, this is perfectly reasonable:

```jsx
// Use explicit light/dark utilities for a small component
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">Dashboard</div>
```

For a larger application, prefer semantic theme tokens:

```jsx
// Use semantic design tokens for scalable theming
<div className="bg-background text-foreground">Dashboard</div>
```

with:

```css
/* Define semantic tokens for light and dark themes */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

Then your components don't need to know the actual color values.

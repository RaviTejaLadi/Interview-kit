# What is the difference between `darkMode: 'media'` and `darkMode: 'class'` (or `'selector'`)?

This determines **how Tailwind decides that dark mode is active**.

## `darkMode: 'media'`

With `media`, dark mode follows the user's operating-system preference.

For example, if the OS prefers dark mode:

```text
OS preference
     ↓
prefers-color-scheme: dark
     ↓
Tailwind dark: styles
```

In Tailwind v3:

```js
// Configure dark mode to follow the operating system preference
module.exports = {
  darkMode: 'media',
};
```

Conceptually, Tailwind generates CSS using:

```css
/* Apply dark styles when the operating system prefers dark mode */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: ...;
  }
}
```

### Advantage

Very simple. No JavaScript is required.

### Limitation

The user doesn't have an application-level theme switch.

If your OS is dark, your application is dark.

---

# `darkMode: 'class'`

With `class`, your application controls dark mode by adding a class to an ancestor element.

For example:

```html
<!-- The dark class activates dark-mode styles for descendants -->
<html class="dark">
  <body>
    ...
  </body>
</html>
```

Configuration in Tailwind v3:

```js
// Configure dark mode to be controlled by a class
module.exports = {
  darkMode: 'class',
};
```

Now:

```html
<!-- dark:bg-gray-900 applies because an ancestor has class="dark" -->
<div class="bg-white dark:bg-gray-900">Content</div>
```

This is useful for:

- Theme toggles
- User preferences
- Saving theme choice
- Light/dark/system modes

---

## What about `'selector'`?

In newer Tailwind versions, the terminology changed.

Tailwind v3 commonly uses:

```js
darkMode: 'class';
```

Newer Tailwind approaches can use a **selector-based dark variant**, where the selector controlling dark mode can be customized.

So you'll commonly see:

```text
Tailwind v3 → 'media' / 'class'
Modern Tailwind → selector-based dark variant
```

The underlying idea is the same:

> **Instead of asking the OS, look for a selector/class that indicates dark mode.**

---

With `media`, dark mode follows the user's operating-system preference.

For example, if the OS prefers dark mode:

```text
OS preference
     ↓
prefers-color-scheme: dark
     ↓
Tailwind dark: styles
```

In Tailwind v3:

```js
// Configure dark mode to follow the operating system preference
module.exports = {
  darkMode: 'media',
};
```

Conceptually, Tailwind generates CSS using:

```css
/* Apply dark styles when the operating system prefers dark mode */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 {
    background-color: ...;
  }
}
```

### Advantage

Very simple. No JavaScript is required.

### Limitation

The user doesn't have an application-level theme switch.

If your OS is dark, your application is dark.

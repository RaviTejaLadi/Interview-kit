# How does Dark Mode work in Tailwind (`dark:` prefix)?

Tailwind provides the **`dark:` variant** for applying styles when dark mode is active.

For example:

```html
<!-- Use different colors when dark mode is active -->
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  <h1>Hello</h1>
</div>
```

The idea is:

```text
Normal mode
    ↓
bg-white + text-gray-900

Dark mode
    ↓
dark:bg-gray-900 + dark:text-white
```

You can use `dark:` with almost any Tailwind utility:

```html
<!-- Apply dark-mode-specific styles to different properties -->
<button
  class="
    bg-blue-600
    text-white
    hover:bg-blue-700
    dark:bg-blue-500
    dark:hover:bg-blue-400
  "
>
  Save
</button>
```

### Simple definition

> **`dark:` is Tailwind's variant for applying a utility when the application's dark-mode condition is active.**

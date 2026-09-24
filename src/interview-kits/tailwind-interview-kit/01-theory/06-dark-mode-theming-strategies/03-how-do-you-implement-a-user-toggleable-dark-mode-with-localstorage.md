# How do you implement a user-toggleable dark mode with `localStorage`?

For a user-controlled theme, the basic flow is:

```text
User clicks toggle
       ↓
Change theme
       ↓
Add/remove "dark"
       ↓
Save preference to localStorage
       ↓
Restore preference on next visit
```

### Example

```js
// Toggle dark mode and persist the user's preference
function toggleDarkMode() {
  const html = document.documentElement;

  const isDark = html.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );
}
```

Then:

```html
<!-- Toggle the application's dark mode -->
<button onclick="toggleDarkMode()">
  Toggle theme
</button>
```

On page load, restore the preference:

```js
// Restore the saved theme when the application starts
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}
```

Now:

```html
<!-- The dark variant responds to the html.dark class -->
<div class="bg-white text-black dark:bg-gray-900 dark:text-white">
  Hello
</div>
```

---

## React version

In React, you can encapsulate the behavior in a custom hook.

```jsx
// Manage a persisted light/dark theme in React
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleTheme: () =>
      setTheme((current) =>
        current === "dark" ? "light" : "dark"
      ),
  };
}
```

Usage:

```jsx
// Use the theme hook from a React component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

### Production consideration

For SSR frameworks such as Next.js, you should also consider **theme flash/hydration issues**.

If the browser initially renders light mode and JavaScript later changes it to dark mode, users may briefly see:

```text
Light page
   ↓
JavaScript executes
   ↓
Dark page
```

This is commonly called **FOUC/theme flash**.

A production implementation should establish the theme as early as possible, often using an inline initialization script or a dedicated theme library.

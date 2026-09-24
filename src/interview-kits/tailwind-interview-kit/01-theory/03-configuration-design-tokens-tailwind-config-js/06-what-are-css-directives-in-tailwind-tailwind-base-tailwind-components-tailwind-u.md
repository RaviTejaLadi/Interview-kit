# What are CSS Directives in Tailwind (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)?

Tailwind v3 commonly used special CSS directives such as:

```css
/* Tell Tailwind where to inject its generated CSS layers */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These aren't normal CSS properties. They are instructions processed by Tailwind.

---

## `@tailwind base`

Injects Tailwind's base styles, including its preflight/reset styles.

```css
/* Include Tailwind's base/reset styles */
@tailwind base;
```

This normalizes browser defaults and establishes foundational styles.

---

## `@tailwind components`

Injects Tailwind's component layer.

```css
/* Include Tailwind's component layer */
@tailwind components;
```

This is also where component-level custom CSS can traditionally be placed.

---

## `@tailwind utilities`

Injects Tailwind's utility classes.

```css
/* Include generated utility classes */
@tailwind utilities;
```

Things like:

```text
flex
grid
p-4
text-center
bg-blue-500
rounded-lg
```

come from the utility layer.

### Conceptual order

```text
@tailwind base
       ↓
   Foundation
       ↓
@tailwind components
       ↓
   Components
       ↓
@tailwind utilities
       ↓
   Utility classes
```

### Tailwind v4 note

Tailwind v4 moved away from these `@tailwind` directives toward a CSS-first approach using:

```css
/* Tailwind v4 imports the framework through a CSS import */
@import "tailwindcss";
```

So `@tailwind base/components/utilities` is primarily a **Tailwind v3 pattern**.
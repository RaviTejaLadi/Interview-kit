# Build a **Responsive Navigation Bar** with desktop links and mobile hamburger drawer.

### Definition

A **responsive navigation bar** changes its layout depending on the viewport.

Typical behavior:

```text
Desktop
┌──────────────────────────────────┐
│ Logo   Home  Products  About     │
└──────────────────────────────────┘

Mobile
┌──────────────────────────────────┐
│ Logo                       ☰     │
└──────────────────────────────────┘
```

Tailwind's responsive variants make this easy.

### Important concepts

- `hidden md:flex` → hidden on mobile, flex on desktop
- `md:hidden` → visible only on mobile
- `fixed` → drawer positioning
- `translate-x-full` → move drawer outside viewport
- `translate-x-0` → show drawer
- `transition-transform` → smooth animation

```html
<!-- Responsive navigation with desktop links and mobile menu button -->
<nav class="border-b bg-white">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
    <a href="/" class="text-xl font-bold"> MyStore </a>

    <div class="hidden items-center gap-6 md:flex">
      <a href="/" class="hover:text-blue-600">Home</a>
      <a href="/products" class="hover:text-blue-600">Products</a>
      <a href="/about" class="hover:text-blue-600">About</a>
    </div>

    <button
      type="button"
      class="rounded-md p-2 md:hidden"
      aria-label="Open navigation menu"
      aria-expanded="false"
    >
      ☰
    </button>
  </div>
</nav>
```

### React implementation

In React, the drawer visibility would normally be controlled with state:

```jsx
// Toggle the mobile navigation drawer with React state.
const [isOpen, setIsOpen] = useState(false);
```

Then:

```jsx
// Render the drawer based on its open state.
<div
  className={`
    fixed inset-y-0 right-0 w-72 bg-white shadow-xl
    transition-transform duration-300
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `}
>
  {/* Navigation links */}
</div>
```

### Accessibility

The hamburger button should expose its state:

```html
aria-expanded="true"
```

or:

```html
aria-expanded="false"
```

The value should change when the drawer opens/closes.

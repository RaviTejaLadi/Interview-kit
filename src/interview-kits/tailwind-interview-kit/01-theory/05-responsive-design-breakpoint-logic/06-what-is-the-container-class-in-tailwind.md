# What is the `container` class in Tailwind?

The Tailwind **`container` utility** creates a responsive element with a maximum width based on the current breakpoint.

For example:

```html
<!-- Center a responsive content container -->
<div class="container mx-auto">Page content</div>
```

`container` controls the maximum width, while:

```text
mx-auto
```

centers the container horizontally.

Conceptually:

```text
Small viewport
┌──────────────────────────┐
│        Content           │
└──────────────────────────┘

Large viewport
┌──────────────────────────────────────────┐
│       ┌──────────────────────┐           │
│       │       Content        │           │
│       └──────────────────────┘           │
└──────────────────────────────────────────┘
```

A common page structure is:

```html
<!-- Build a centered responsive page container -->
<div class="container mx-auto px-4">
  <h1 class="text-3xl font-bold">Dashboard</h1>

  <p class="mt-4">Dashboard content goes here.</p>
</div>
```

Here:

- `container` → controls maximum width
- `mx-auto` → centers it
- `px-4` → adds horizontal padding

### `container` vs `w-full`

```html
<!-- Full-width element -->
<div class="w-full">...</div>

<!-- Responsive max-width container -->
<div class="container mx-auto">...</div>
```

`w-full` means:

> Take the available width.

`container` means:

> Take the available width up to a responsive maximum width.

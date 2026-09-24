# Build an interactive **Form Input Group** with floating labels, error messages, and focus rings using `peer`.

### Definition

A **floating-label input** initially displays the label inside or near the input. When the input receives focus or contains text, the label moves above the input.

Tailwind's `peer` variant is particularly useful here.

### What is `peer`?

`peer` allows an element to change its styling based on the state of a **previous sibling**.

```text
<input class="peer">
       │
       │ state changes
       ↓
<label class="peer-focus:...">
```

For example:

```html
<!-- Floating label using the peer variant -->
<div class="relative">
  <input
    id="email"
    type="email"
    placeholder=" "
    class="peer w-full rounded-lg border px-3 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  />

  <label
    for="email"
    class="pointer-events-none absolute left-3 top-3 bg-white px-1 text-gray-500 transition-all
           peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600
           peer-[:not(:placeholder-shown)]:-top-2
           peer-[:not(:placeholder-shown)]:text-xs"
  >
    Email
  </label>
</div>
```

### Why `placeholder=" "`?

This is a common floating-label technique.

The input has a placeholder containing only a space:

```html
placeholder=" "
```

This allows the CSS state:

```css
:placeholder-shown
```

to distinguish between an empty and filled input.

---

## Adding Error State

You can conditionally add an error message:

```html
<!-- Form input with an accessible error message -->
<div>
  <div class="relative">
    <input
      id="email"
      type="email"
      aria-invalid="true"
      aria-describedby="email-error"
      class="peer w-full rounded-lg border border-red-500 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/20"
      placeholder=" "
    />

    <label
      for="email"
      class="absolute left-3 top-3 bg-white px-1 text-gray-500"
    >
      Email
    </label>
  </div>

  <p id="email-error" class="mt-1 text-sm text-red-600">
    Please enter a valid email address.
  </p>
</div>
```

The important accessibility relationship is:

```text
input
 │
 ├── aria-invalid="true"
 │
 └── aria-describedby="email-error"
                         │
                         ↓
                  Error message
```
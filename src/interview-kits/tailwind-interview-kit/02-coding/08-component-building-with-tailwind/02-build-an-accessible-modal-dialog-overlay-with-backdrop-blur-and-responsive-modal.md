# Build an accessible **Modal Dialog Overlay** with backdrop blur and responsive modal card.

### Definition

A **modal dialog** is a temporary UI layer that appears above the current page and requires the user to interact with it before returning to the underlying content.

A good modal should:

- Have an accessible name
- Trap keyboard focus
- Close with `Escape`
- Prevent interaction with the background
- Have a visible close button
- Work on mobile screens

Tailwind handles the **visual styling**, while JavaScript or the native `<dialog>` element handles modal behavior and focus management.

### Important Tailwind concepts

- `fixed inset-0` → covers the viewport
- `bg-black/50` → translucent backdrop
- `backdrop-blur-sm` → backdrop blur
- `flex items-center justify-center` → center modal
- `max-w-lg w-[calc(100%-2rem)]` → responsive width
- `overflow-y-auto` → allows scrolling on small screens

```html
<!-- Responsive modal with backdrop blur -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
    <div class="flex items-center justify-between">
      <h2 id="modal-title" class="text-xl font-bold">Delete Product</h2>

      <button
        type="button"
        aria-label="Close dialog"
        class="rounded-md p-2 hover:bg-gray-100 focus-visible:outline-2"
      >
        ✕
      </button>
    </div>

    <p class="mt-4 text-gray-600">Are you sure you want to delete this product?</p>

    <div class="mt-6 flex justify-end gap-3">
      <button class="rounded-lg border px-4 py-2 hover:bg-gray-50">Cancel</button>

      <button class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Delete</button>
    </div>
  </div>
</div>
```

### Important accessibility point

`role="dialog"` and `aria-modal="true"` describe the modal to assistive technology, but **they don't implement focus trapping or Escape-key handling**.

For production React applications, consider the native `<dialog>` element or an accessible dialog library.

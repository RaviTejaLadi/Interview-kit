# Build a responsive, accessible **E-commerce Product Card** with image aspect ratio, badges, star ratings, and hover state transitions.

### Definition

An **e-commerce product card** is a reusable UI component that displays product information such as:

- Product image
- Product name
- Price
- Rating
- Badges like `New` or `Sale`
- Action buttons

A responsive card should adapt to different screen sizes, while an accessible card should work correctly with keyboard navigation, screen readers, and sufficient color contrast.

### Important Tailwind concepts

| Requirement       | Tailwind concept                  |
| ----------------- | --------------------------------- |
| Responsive layout | `sm:`, `md:`, `lg:`               |
| Image ratio       | `aspect-square`, `aspect-[4/3]`   |
| Badge             | `absolute`, positioning utilities |
| Star rating       | `text-yellow-500`                 |
| Hover effect      | `hover:`                          |
| Smooth transition | `transition`, `duration-300`      |
| Keyboard focus    | `focus-visible:`                  |
| Image fitting     | `object-cover`                    |

```html
<!-- Responsive product card with hover and focus states -->
<article
  class="group overflow-hidden rounded-xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
>
  <div class="relative aspect-square overflow-hidden">
    <img
      src="/product.jpg"
      alt="Black wireless headphones"
      class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
    />

    <span
      class="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white"
    >
      Sale
    </span>
  </div>

  <div class="p-4">
    <h2 class="font-semibold text-gray-900">Wireless Headphones</h2>

    <div class="mt-2 flex items-center gap-1" aria-label="4 out of 5 stars">
      <span aria-hidden="true">★★★★☆</span>
      <span class="text-sm text-gray-500">(120)</span>
    </div>

    <p class="mt-2 text-lg font-bold">$79.99</p>

    <button
      class="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Add to Cart
    </button>
  </div>
</article>
```

### Key idea

`group` allows the parent hover state to control a child:

```text
Product Card
     │
     └── Image
           ↑
     group-hover:scale-105
```

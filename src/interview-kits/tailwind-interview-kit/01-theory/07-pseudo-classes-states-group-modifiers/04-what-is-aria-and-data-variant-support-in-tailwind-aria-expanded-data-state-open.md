# What is `aria-*` and `data-*` variant support in Tailwind (`aria-expanded:`, `data-[state=open]:`)?

Modern Tailwind can style elements based on **ARIA attributes and data attributes**.

This is particularly useful for accessible components and UI libraries.

---

## ARIA variants

ARIA attributes communicate accessibility state and semantics to assistive technologies.

For example:

```html id="q5w0sj"
<!-- Change the icon when the disclosure is expanded -->
<button
  aria-expanded="true"
  class="aria-expanded:font-bold"
>
  Menu
</button>
```

Tailwind can detect:

```text id="7h7x7u"
aria-expanded="true"
```

and apply:

```text id="2p5v4s"
aria-expanded:font-bold
```

You can use variants such as:

```text id="7o8k3r"
aria-checked:
aria-disabled:
aria-expanded:
aria-hidden:
aria-pressed:
aria-selected:
```

### Example

```html id="4x3k29"
<!-- Style the button differently when it is expanded -->
<button
  aria-expanded="false"
  class="aria-expanded:bg-blue-100"
>
  Options
</button>
```

The advantage is that the **accessibility state and visual state can come from the same source of truth**.

---

# `data-*` variants

Data attributes are commonly used by component libraries to expose component state.

For example:

```html id="8y5f6e"
<!-- Style the component based on its custom state attribute -->
<div data-state="open" class="data-[state=open]:bg-blue-100">
  Menu content
</div>
```

The syntax is:

```text
data-[attribute=value]:utility
```

For example:

```html id="j4l5bd"
<!-- Apply different styles for open and closed states -->
<div
  data-state="open"
  class="
    data-[state=open]:border-blue-500
    data-[state=closed]:border-gray-300
  "
>
  Content
</div>
```

This is very common with headless UI/component libraries.

### Why is this useful?

Instead of maintaining separate React state purely for styling:

```jsx id="n0pq4h"
// State can be represented directly in the DOM
<div data-state={isOpen ? "open" : "closed"}>
```

Tailwind can react to the DOM state:

```text id="0q1k7j"
data-state="open"
       ↓
data-[state=open]:...
       ↓
Tailwind styling
```
# What are the main benefits of Tailwind CSS (bundle size plateau, no naming fatigue, local context)?

## Smaller CSS growth / bundle-size plateau

One important Tailwind advantage is that you don't generally create a new CSS rule every time you create a new component.

For example, imagine 100 components.

Traditional CSS might result in:

```css
.card {}
.profile-card {}
.product-card {}
.dashboard-card {}
.settings-card {}
...
```

As the application grows, the number of custom rules can grow substantially.

With Tailwind, many components reuse the **same utilities**:

```html
<!-- Reuse the same generated utilities -->
<div class="p-4 rounded-lg shadow">Card</div>

<div class="p-4 rounded-lg shadow">Another card</div>
```

The CSS for `p-4`, `rounded-lg`, and `shadow` can be shared.

### Important nuance

It's better to think of this as **CSS growth being controlled**, not "Tailwind automatically makes every application tiny."

Your final CSS depends on:

- utilities actually used
- custom CSS
- plugins
- configuration
- generated variants
- Tailwind version/configuration

---

## No naming fatigue

With traditional CSS, you constantly have to invent names:

```text
.card
.card-container
.user-card
.user-card-wrapper
.profile-card
.profile-card-header
.profile-card-title
```

Tailwind removes much of that naming problem:

```html
<!-- No custom class name is required -->
<div class="p-4 rounded-xl shadow">...</div>
```

You spend less time deciding:

> "What should I call this class?"

---

## Local context

With Tailwind, the styling is close to the element being styled.

```jsx
// Styling is visible directly beside the component markup
<button className="px-4 py-2 rounded-md bg-blue-600 text-white">Submit</button>
```

You don't have to jump between:

```text
Component.jsx
       ↓
Component.css
       ↓
Some global CSS
       ↓
Another override
```

This makes it easier to understand **why an element looks the way it does**.

# What is the `@apply` directive and why is overusing `@apply` considered an anti-pattern?

`@apply` allows you to use Tailwind utility classes inside your CSS.

For example:

```css
/* Compose a custom CSS class from Tailwind utilities */
.btn-primary {
  @apply px-4 py-2 rounded-md bg-blue-600 text-white;
}
```

Then:

```html
<!-- Use the custom component class -->
<button class="btn-primary">
  Save
</button>
```

Without `@apply`, you'd write the CSS manually:

```css
/* The same styles written as normal CSS */
.btn-primary {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #2563eb;
  color: white;
}
```

So:

> **`@apply` lets you compose Tailwind utilities inside a CSS rule.**

---

# Why is overusing `@apply` considered an anti-pattern?

The main reason is that it can remove one of Tailwind's biggest advantages: **keeping styling local to the markup**.

If you start doing this everywhere:

```css
/* Excessive @apply can turn Tailwind back into a traditional CSS abstraction */
.card {
  @apply p-4 rounded-lg bg-white shadow;
}

.card-title {
  @apply text-xl font-bold text-gray-900;
}

.card-description {
  @apply mt-2 text-gray-600;
}

.card-button {
  @apply px-4 py-2 rounded bg-blue-500 text-white;
}
```

you have effectively created a traditional CSS component system using Tailwind as the underlying syntax.

Your JSX becomes:

```jsx
// The styling is now hidden behind custom CSS class names
<div className="card">
  <h2 className="card-title">Title</h2>
  <p className="card-description">Description</p>
  <button className="card-button">Save</button>
</div>
```

You lose some of the **local context** that makes Tailwind attractive.

### Another issue: abstraction can become harder to manage

You might end up with:

```text
.card
.card-large
.card-featured
.card-dark
.card-mobile
.card-with-image
.card-with-footer
...
```

Now you're back to managing a growing collection of custom CSS abstractions.

---

# When should you use `@apply`?

`@apply` isn't inherently bad.

It's useful when you have a genuine reason to create a CSS abstraction.

For example, a project might have a legacy component that needs a reusable CSS class:

```css
/* Use @apply when a reusable CSS abstraction provides real value */
.form-input {
  @apply w-full rounded-md border border-gray-300 px-3 py-2;
}
```

It can also be useful for:

- third-party HTML you don't control
- global CSS
- complex selectors
- pseudo-elements
- legacy CSS migration
- a small number of genuinely reusable patterns

### The principle

> **Use Tailwind utilities by default; use `@apply` when a CSS abstraction actually improves the architecture.**

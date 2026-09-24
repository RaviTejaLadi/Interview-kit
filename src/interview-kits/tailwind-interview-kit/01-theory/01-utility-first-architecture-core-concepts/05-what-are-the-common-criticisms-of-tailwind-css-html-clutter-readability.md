# What are the common criticisms of Tailwind CSS (HTML clutter, readability)?

Tailwind is not without trade-offs.

## HTML/JSX clutter

A component can contain many classes:

```jsx
// Multiple utilities can make the markup visually dense
<button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
  Save
</button>
```

Compare that with:

```jsx
// A semantic class keeps the markup short
<button className="primary-button">
  Save
</button>
```

This is one of the most common criticisms of Tailwind.

---

## Readability

A long utility list can be difficult to scan:

```html
<!-- Many utilities can make the element harder to read -->
<div class="flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-md border border-gray-200">
  ...
</div>
```

You need to learn Tailwind's utility vocabulary before the code becomes easy to understand.

---

## Repetition

You can sometimes end up repeating the same utilities:

```jsx
// Similar utility combinations can become repetitive
<button className="px-4 py-2 bg-blue-600 text-white rounded">
  Save
</button>

<button className="px-4 py-2 bg-blue-600 text-white rounded">
  Submit
</button>
```

For repeated UI patterns, you can extract a React component:

```jsx
// Reuse a component instead of repeating the same utility classes
function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded">
      {children}
    </button>
  );
}
```
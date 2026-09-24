# How do you properly handle dynamic classes in Tailwind?

There are several good approaches.

## Approach 1: Use a complete class mapping

This is usually the cleanest solution.

```jsx
// Map runtime values to complete Tailwind class names
const colorClasses = {
  blue: "text-blue-500",
  red: "text-red-500",
  green: "text-green-500",
};

function Status({ color }) {
  return (
    <span className={colorClasses[color]}>
      Status
    </span>
  );
}
```

Now Tailwind can see:

```text
text-blue-500
text-red-500
text-green-500
```

All complete class names are present in the source.

---

## Approach 2: Use conditional classes

```jsx
// Select between complete, statically detectable class names
function Button({ primary }) {
  return (
    <button
      className={
        primary
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-black"
      }
    >
      Save
    </button>
  );
}
```

Tailwind can detect all four classes.

---

## Approach 3: Use a class utility such as `clsx`

For larger React applications, `clsx` or similar utilities make conditional classes easier to manage.

```jsx
// Compose complete Tailwind classes conditionally
import clsx from "clsx";

function Button({ primary, disabled }) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded",
        primary ? "bg-blue-500 text-white" : "bg-gray-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      Save
    </button>
  );
}
```

The important part is that the complete classes still appear literally in the source.

---

## Approach 4: Use CSS variables for truly dynamic values

If the value comes from a runtime source, such as an API, don't necessarily create arbitrary Tailwind classes dynamically.

For example:

```jsx
// Use a CSS variable when the color is truly runtime data
function UserBadge({ color }) {
  return (
    <span
      className="text-[var(--user-color)]"
      style={{ "--user-color": color }}
    >
      User
    </span>
  );
}
```

Here:

```text
Tailwind controls the structure
        +
Runtime CSS variable controls the actual value
```

This is useful when the value isn't known at build time.

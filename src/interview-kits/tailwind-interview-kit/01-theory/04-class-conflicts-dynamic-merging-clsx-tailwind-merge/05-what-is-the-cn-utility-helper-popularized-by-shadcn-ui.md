# What is the `cn(...)` utility helper (popularized by shadcn/ui)?

`cn` is **not a Tailwind built-in**.

It is a common helper pattern popularized by projects such as **shadcn/ui**.

A typical implementation combines:

- `clsx` → conditionally combine classes
- `tailwind-merge` → resolve Tailwind conflicts

```js id="7n3q8m"
// Combine conditional classes and resolve Tailwind conflicts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Now you can write:

```jsx id="9k1f4p"
// Use cn for conditional Tailwind classes and overrides
<button
  className={cn(
    "px-4 py-2 bg-blue-500 text-white",
    isDisabled && "opacity-50",
    className
  )}
>
  Save
</button>
```

### Why is `cn` useful?

Instead of writing:

```jsx id="8t6r1a"
// Manually combine conditional classes
className={twMerge(
  clsx(
    "px-4 py-2 bg-blue-500",
    isDisabled && "opacity-50",
    className
  )
)}
```

you simply write:

```jsx id="8e3w5p"
// Reuse the shared className helper
className={cn(
  "px-4 py-2 bg-blue-500",
  isDisabled && "opacity-50",
  className
)}
```

### Mental model

```text
clsx
 ↓
"Which classes should be included?"
 ↓
tailwind-merge
 ↓
"Which conflicting Tailwind utilities should be removed?"
 ↓
Final className
```
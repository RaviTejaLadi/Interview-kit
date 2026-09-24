# What is `tailwind-merge` and how does it resolve Tailwind class conflicts?

**`tailwind-merge`** is a utility that understands Tailwind's class groups and removes conflicting classes.

Example:

```js id="6l4t2x"
// tailwind-merge keeps the last conflicting Tailwind utility
import { twMerge } from "tailwind-merge";

twMerge("p-2 p-4");
```

Result:

```text
p-4
```

Instead of:

```text
p-2 p-4
```

It understands that:

```text
p-2
p-4
```

belong to the same Tailwind utility group: **padding**.

---

## Another example

```js id="5v7h1n"
// Resolve conflicting background utilities
twMerge("bg-red-500 bg-blue-500");
```

Result:

```text
bg-blue-500
```

Similarly:

```js id="r8j2k1"
// Resolve conflicting text-size utilities
twMerge("text-sm text-lg");
```

Result:

```text
text-lg
```

### Why is this useful?

Consider a reusable React component:

```jsx id="4x2n8k"
// Allow consumers to override the default padding
function Button({ className }) {
  return (
    <button className={twMerge("px-4 py-2 bg-blue-500", className)}>
      Save
    </button>
  );
}
```

Now:

```jsx id="j9c3f0"
// Consumer can override the default horizontal padding
<Button className="px-8" />
```

Without merging:

```text
px-4 py-2 bg-blue-500 px-8
```

With `twMerge`:

```text
py-2 bg-blue-500 px-8
```

The conflicting `px-4` is removed.

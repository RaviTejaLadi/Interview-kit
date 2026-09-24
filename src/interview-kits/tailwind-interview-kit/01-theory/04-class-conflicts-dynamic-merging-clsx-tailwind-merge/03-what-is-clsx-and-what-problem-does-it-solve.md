# What is `clsx` and what problem does it solve?

**`clsx`** is a small JavaScript utility for conditionally constructing a `className` string.

Without `clsx`:

```jsx id="r4h6j2"
// Build conditional class names manually
const className = `button ${isActive ? "active" : ""}`;
```

With `clsx`:

```jsx id="3h9v1k"
// Build class names declaratively with clsx
import clsx from "clsx";

const className = clsx(
  "button",
  isActive && "active",
  disabled && "opacity-50"
);
```

If:

```js
isActive = true;
disabled = false;
```

the result is:

```text id="4y8q6a"
button active
```

### `clsx` can handle objects

```jsx id="1h0q8z"
// Use an object to conditionally include classes
const className = clsx("button", {
  active: isActive,
  disabled: isDisabled,
});
```

### Important limitation

`clsx` **does not understand Tailwind conflicts**.

For example:

```jsx id="1y7m5q"
// clsx combines classes but does not resolve Tailwind conflicts
clsx("p-2", "p-4");
```

returns something like:

```text
p-2 p-4
```

It doesn't decide which padding should win.

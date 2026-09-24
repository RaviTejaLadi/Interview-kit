# Why will dynamic class construction like `text-${color}-500` fail in Tailwind?

Consider:

```jsx
// Dynamic interpolation does not contain a complete Tailwind class
const color = "blue";

<div className={`text-${color}-500`}>
  Hello
</div>
```

At runtime React produces:

```text
text-blue-500
```

But Tailwind's build process doesn't execute your JavaScript to discover that result.

When it scans the source, it sees something conceptually like:

```text
text-${color}-500
```

It cannot reliably determine all possible values of `color`.

For example:

```js
// Tailwind cannot know every possible runtime value
const color = getColorFromAPI();
```

The value could be:

```text
blue
red
green
purple
orange
...
```

Tailwind would need to generate CSS for every possible result, which it cannot infer safely from arbitrary JavaScript.

### The important rule

> **Tailwind needs complete class names to exist in the source code.**

This works:

```jsx
// Complete class names are visible to Tailwind
<div className="text-blue-500">
  Hello
</div>
```

This is problematic:

```jsx
// The complete class name does not exist statically
<div className={`text-${color}-500`}>
  Hello
</div>
```
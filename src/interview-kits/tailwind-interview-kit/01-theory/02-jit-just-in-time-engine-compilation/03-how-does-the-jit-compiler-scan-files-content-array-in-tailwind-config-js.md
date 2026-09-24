# How does the JIT compiler scan files (`content` array in `tailwind.config.js`)?

In Tailwind v3, you tell Tailwind which files may contain class names using the `content` configuration.

```js
// Tell Tailwind which source files to scan for class names
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
};
```

Tailwind scans those files and looks for strings that resemble utility classes.

For example:

```jsx
// These classes can be detected by Tailwind
function Button() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      Save
    </button>
  );
}
```

Tailwind detects:

```text
px-4
py-2
bg-blue-500
text-white
rounded
```

and generates the corresponding CSS.

### Why is `content` important?

If Tailwind doesn't scan a file containing your classes, it may not know that those utilities are being used.

For example:

```js
// Incorrect/incomplete content configuration can cause missing styles
module.exports = {
  content: [
    "./src/components/**/*.jsx",
  ],
};
```

If your classes are actually inside:

```text
src/pages/Home.jsx
```

Tailwind may not detect them.

# What is the difference between `theme` and `theme.extend`?

This is one of the most important configuration concepts.

## `theme.extend`

`extend` means:

> **Keep Tailwind's default values and add my custom values.**

```js
// Extend Tailwind's existing theme instead of replacing it
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#6366f1',
      },
    },
  },
};
```

You still have Tailwind's normal colors:

```text
red-500
blue-500
green-500
...
```

and now also:

```text
brand
```

---

## Direct `theme`

When you define a value directly under `theme`, you're customizing/replacing that particular theme section rather than extending it.

For example:

```js
// Replace Tailwind's default color configuration with your own
module.exports = {
  theme: {
    colors: {
      brand: '#6366f1',
    },
  },
};
```

Now you should not expect Tailwind's default color palette to remain available in the same way.

### Easy mental model

```text
theme
└── "Replace/customize this section"

theme.extend
└── "Add to the existing section"
```

For most application-level customization, `theme.extend` is the safer choice.

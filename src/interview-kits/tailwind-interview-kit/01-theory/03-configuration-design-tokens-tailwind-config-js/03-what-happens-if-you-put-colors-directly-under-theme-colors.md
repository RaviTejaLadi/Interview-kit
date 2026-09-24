# What happens if you put colors directly under `theme: { colors: { ... } }`?

Suppose you write:

```js
// Replace the default Tailwind color palette
module.exports = {
  theme: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
    },
  },
};
```

You have replaced the default `colors` configuration with your own color definitions.

So classes such as:

```html
<!-- These depend on the default color palette -->
<div class="bg-red-500 text-gray-900">Hello</div>
```

may no longer work because `red` and `gray` are no longer part of your configured color palette.

Your custom classes work:

```html
<!-- These use the custom colors defined in the configuration -->
<div class="bg-primary text-secondary">Hello</div>
```

### Compare

```js
// Keep defaults + add custom colors
theme: {
  extend: {
    colors: {
      primary: "#2563eb",
    },
  },
}
```

versus:

```js
// Replace the colors configuration
theme: {
  colors: {
    primary: "#2563eb",
  },
}
```

### Interview answer

> `theme.extend` adds values to Tailwind's existing theme, while defining `colors` directly under `theme` replaces the default color configuration.

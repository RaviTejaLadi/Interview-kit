# What is the `fr` unit?

`fr` means **fraction of the available space** in a CSS Grid container.

It allows grid tracks to share the remaining available space.

```css
/* Divide the available space into three equal fractions */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

This creates:

```text
┌────────┬────────┬────────┐
│   1fr   │   1fr   │   1fr  │
│   33%   │   33%   │   33%  │
└────────┴────────┴────────┘
```

You can also use different proportions:

```css
/* Give the second column twice the available space of the first */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
```

The available space is divided into **3 fractions**:

```text
1fr       2fr
┌───────┬──────────────┐
│       │              │
│  1/3  │      2/3     │
└───────┴──────────────┘
```
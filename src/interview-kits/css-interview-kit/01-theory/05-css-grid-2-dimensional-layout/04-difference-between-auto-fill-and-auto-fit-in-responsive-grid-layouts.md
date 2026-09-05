# Difference between `auto-fill` and `auto-fit`

Both are commonly used with:

```css
repeat()
```

and:

```css
minmax()
```

For example:

```css
/* Automatically create as many 200px-or-larger columns as possible */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

### `auto-fill`

`auto-fill` tries to create **as many grid tracks as can fit**, even if some tracks are empty.

```css
/* Keep empty tracks when there is extra room */
.container {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

Think:

> "Fill the available space with as many columns as possible."

### `auto-fit`

`auto-fit` also creates as many tracks as possible, but **collapses empty tracks**.

```css
/* Collapse unused tracks and allow existing items to expand */
.container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

Think:

> "Fit my existing items into the available space."

### The important difference

Suppose there are only **2 cards**, but the container is wide enough for 4 columns.

```text
auto-fill:

┌──────┬──────┬──────┬──────┐
│ Card │ Card │empty │empty │
└──────┴──────┴──────┴──────┘


auto-fit:

┌────────────┬────────────┐
│    Card    │    Card    │
└────────────┴────────────┘
```

With `auto-fit`, the empty tracks collapse, allowing the existing items to expand.

**Practical rule:** For responsive card layouts, `auto-fit` is often the more useful default.

# What are child selectors like `*:` and `has-*:` in modern Tailwind?

Modern Tailwind supports more advanced CSS selector variants.

## `*:` — direct children

The `*:` variant applies a utility to **direct children** of an element.

For example:

```html id="8m8y9a"
<!-- Apply a text color to all direct children -->
<div class="*:text-gray-700">
  <p>First paragraph</p>
  <p>Second paragraph</p>
  <span>Third element</span>
</div>
```

Conceptually:

```css id="1d0p2q"
/* Simplified direct-child selector */
.parent > * {
  color: ...;
}
```

This can be useful for simple layout/styling patterns.

For example:

```html id="a8q8q2"
<!-- Give every direct child consistent vertical spacing -->
<div class="*:mb-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Important

`*:` targets **direct children**, not every descendant.

---

# `has-*:` — parent based on descendant state

CSS now supports the powerful `:has()` relational pseudo-class.

Tailwind exposes it through `has-*`.

For example:

```html id="frt8e6"
<!-- Change the card border when it contains a checked checkbox -->
<div class="rounded-lg border has-[:checked]:border-blue-500">
  <input type="checkbox" />
  <span>Enable feature</span>
</div>
```

Conceptually:

```css id="2d3m7g"
/* Apply the border when the card contains a checked element */
.card:has(:checked) {
  border-color: ...;
}
```

So:

```text id="x4q0yn"
<div>
   │
   ├── checkbox
   │      ↓
   │   :checked
   │
   └── parent detects it using :has()
```

---

## Another `has-*` example

```html id="1f7p0n"
<!-- Highlight the form when it contains an invalid input -->
<form class="has-[:invalid]:border-red-500">
  <input required />
</form>
```

The parent reacts to the state of a descendant.

This is powerful because traditionally you needed JavaScript or complicated CSS relationships for some of these UI states.

---

# `group` vs `peer` vs `has`

This distinction is worth memorizing.

| Feature | Relationship | Example |
|---|---|---|
| `group` | Parent → child | Parent hover changes child |
| `peer` | Sibling → sibling | Checkbox changes label |
| `has-*` | Parent ← descendant | Parent reacts to descendant |
| `*:` | Parent → direct children | Style all direct children |
| `aria-*` | Attribute state | `aria-expanded` |
| `data-*` | Custom state | `data-state="open"` |

### Mental model

```text id="i1p2d4"
group
Parent
  └── Child
      ↑
      group-hover


peer
Sibling A
    ↓
Sibling B
    ↑
peer-checked


has
Parent
  ↑
  │
Descendant state
    :checked


data / aria
Element
   ↓
Attribute state
   ↓
Tailwind variant
```
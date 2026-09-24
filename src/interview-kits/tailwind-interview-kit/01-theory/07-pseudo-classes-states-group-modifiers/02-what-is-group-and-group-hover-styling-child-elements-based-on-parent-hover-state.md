# What is `group` and `group-hover` (styling child elements based on parent hover state)?

Sometimes you want to style a **child based on the state of its parent**.

Normal CSS can do this:

```css id="bl2gcb"
/* Style the title when the card is hovered */
.card:hover .title {
  color: blue;
}
```

Tailwind provides `group` for this pattern.

First, mark the parent:

```html id="4p2g6w"
<!-- Mark the parent as a group so children can react to its state -->
<div class="group">
  <h2 class="text-gray-900 group-hover:text-blue-600">Product</h2>
</div>
```

Here:

```text id="o6vl1k"
group
  │
  ├── Parent hover
  │
  └── group-hover:text-blue-600
          ↓
       Child changes
```

### Real example

```html id="6dy3dr"
<!-- Change the icon and title when the entire card is hovered -->
<a href="#" class="group block rounded-lg p-4">
  <div class="flex items-center gap-3">
    <span class="text-gray-500 group-hover:text-blue-600"> → </span>

    <h2 class="text-gray-900 group-hover:text-blue-600">Read article</h2>
  </div>
</a>
```

Hovering anywhere over the `<a>` causes the children using `group-hover:` to change.

### Named groups

Modern Tailwind also supports named groups when you have nested groups.

```html id="jyuwpn"
<!-- Use a named group to target the correct parent state -->
<div class="group/card">
  <h2 class="group-hover/card:text-blue-600">Card title</h2>
</div>
```

This prevents ambiguity when multiple nested elements are groups.

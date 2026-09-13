# What is Flexbox and what problem does it solve?

**Flexbox** is a CSS layout system used to arrange elements in a **row or column** and control their alignment, spacing, and size. It is especially useful for building responsive layouts without relying heavily on floats or positioning.

**Flexbox** (Flexible Box Layout) is a one-dimensional CSS layout system.

It helps you:

- Arrange elements horizontally or vertically.
- Align items easily.
- Distribute available space.
- Create responsive layouts.
- Control how items grow or shrink.

### Example

```css
/* Make the container a Flexbox */
.container {
  display: flex;
}
```

```html
<!-- These items will be placed in a row by default -->
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

By default:

```text
Item 1   Item 2   Item 3
  →        →        →
       Main Axis
```

# What is CSS Inheritance?

### Definition

**Inheritance** is the mechanism where certain CSS properties automatically get their computed value from the parent element.

Think of it like this:

```text
body
 └── div
      └── p
           └── span
```

If `body` has:

```css
body {
  color: blue;
}
```

The text inside child elements will generally inherit that `color`.

```html
<!-- The paragraph inherits color from body -->
<body>
  <p>Hello</p>
</body>
```

The paragraph becomes blue even though we didn't explicitly write:

```css
p {
  color: blue;
}
```

---

## Properties that commonly inherit

Examples include:

```css
/* Common inherited properties */
color
font-family
font-size
font-weight
font-style
line-height
text-align
visibility
```

For example:

```css
/* Set common typography for the entire page */
body {
  font-family: Arial, sans-serif;
  color: #333;
}
```

Children generally inherit these values.

---

## Properties that normally don't inherit

Many layout and box-model properties do **not** inherit.

Examples:

```text
margin
padding
border
width
height
display
position
background
```

For example:

```css
/* Padding does not automatically pass to child elements */
.parent {
  padding: 20px;
}
```

The child does **not** automatically receive `padding: 20px`.

### Important

Inheritance and the cascade are different concepts.

**Cascade:**

> Which declaration wins?

**Inheritance:**

> If an element doesn't have its own value, can it receive the value from its parent?

# How is CSS Specificity Calculated?

### Definition

**Specificity** is a scoring system that determines which selector has more priority when multiple selectors target the same element.

A useful mental model is:

```text
Inline styles > ID > Class/Attribute/Pseudo-class > Element
```

You can represent specificity as:

```text
Inline   ID   Class   Element
  1       0      0        0
```

More commonly, selectors are compared as a tuple:

```text
(a, b, c, d)
```

Where:

- `a` = inline styles
- `b` = IDs
- `c` = classes, attributes, pseudo-classes
- `d` = elements and pseudo-elements

### Example

```html
<!-- The paragraph receives multiple matching rules -->
<p id="title" class="text">Hello</p>
```

```css
/* Specificity: (0, 0, 1, 0) */
.text {
  color: blue;
}

/* Specificity: (0, 1, 0, 0) */
#title {
  color: red;
}
```

`#title` wins because:

```text
(0, 1, 0, 0) > (0, 0, 1, 0)
```

So the text becomes **red**.

### Common specificity values

| Selector        | Specificity |
| --------------- | ----------: |
| `*`             |   `0-0-0-0` |
| `div`           |   `0-0-0-1` |
| `.box`          |   `0-0-1-0` |
| `[type="text"]` |   `0-0-1-0` |
| `:hover`        |   `0-0-1-0` |
| `#header`       |   `0-1-0-0` |
| Inline style    |   `1-0-0-0` |

# Canvas vs SVG: Key architectural differences

Both `<canvas>` and **SVG** are used for graphics, but their architectures are very different.

## Canvas

`<canvas>` provides a **bitmap drawing surface**.

JavaScript draws pixels onto the canvas.

```html id="cvnq2w"
<!-- Create a canvas drawing surface -->
<canvas id="chart" width="400" height="200"></canvas>
```

```javascript id="q9v4ps"
// Draw a rectangle onto the canvas bitmap.
const canvas = document.querySelector('#chart');
const ctx = canvas.getContext('2d');

ctx.fillRect(50, 50, 150, 80);
```

Think of Canvas like a **painting**.

Once something is drawn, the canvas does not automatically maintain separate DOM elements for each shape.

### Canvas characteristics

- Pixel/bitmap-based drawing surface
- Good for many dynamic drawings
- Good for games
- Good for image manipulation
- Good for real-time graphics
- Objects aren't automatically represented as individual DOM nodes
- Accessibility requires additional work

---

# SVG

**SVG (Scalable Vector Graphics)** is a **vector-based, XML-based graphics format**.

SVG elements become part of the document structure.

```html id="m6qf6d"
<!-- SVG creates vector graphics using individual elements -->
<svg width="400" height="200" viewBox="0 0 400 200">
  <rect x="50" y="50" width="150" height="80" />
</svg>
```

The `<rect>` is an actual SVG element that can be:

- Selected
- Styled with CSS
- Modified with JavaScript
- Given attributes
- Included in the document structure

Think of SVG like **building with individual shapes**.

### SVG characteristics

- Vector-based
- Resolution independent
- DOM-based
- Individual elements can be manipulated
- CSS can style SVG elements
- Good for icons
- Good for diagrams
- Good for charts
- Good for logos
- Can provide strong accessibility when structured appropriately

---

# Canvas vs SVG — Quick Comparison ⭐

| Feature                        | Canvas                                                 | SVG                                            |
| ------------------------------ | ------------------------------------------------------ | ---------------------------------------------- |
| Graphics                       | Raster/pixel drawing surface                           | Vector                                         |
| DOM elements                   | ❌ No individual shape DOM nodes                       | ✅ Yes                                         |
| Scaling                        | Can become blurry if bitmap resolution is insufficient | ✅ Scales cleanly                              |
| CSS styling                    | Limited to canvas as a whole; drawing uses API         | ✅ Strong                                      |
| Event handling                 | Usually coordinate-based/manual                        | ✅ Can target individual elements              |
| Accessibility                  | Requires extra work                                    | Generally easier                               |
| Large number of simple objects | Often better                                           | Can become expensive with huge DOM trees       |
| Games/real-time graphics       | ✅ Excellent use case                                  | ⚠️ Less suitable for very large dynamic scenes |
| Icons/logos                    | ⚠️ Possible                                            | ✅ Excellent                                   |
| Charts/diagrams                | Possible                                               | ✅ Excellent                                   |

### Simple mental model

```text id="oj5b7s"
Canvas
→ "Draw pixels on a surface."

SVG
→ "Create and manipulate vector elements."
```

### Interview shortcut ⭐

**Canvas = pixel-oriented drawing surface**

**SVG = DOM-based vector graphics**

Use **Canvas** when you need high-frequency drawing such as games, image processing, or real-time visualization.

Use **SVG** when you need scalable, interactive graphics whose individual shapes need to be styled, selected, or manipulated.

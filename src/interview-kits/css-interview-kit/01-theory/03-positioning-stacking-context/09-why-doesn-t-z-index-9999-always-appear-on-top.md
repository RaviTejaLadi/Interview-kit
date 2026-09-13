# Why doesn't `z-index: 9999` always appear on top?

Because `z-index` is **not a global priority number**.

Consider:

```css
/* This creates a stacking context at z-index 1. */
.container-a {
  position: relative;
  z-index: 1;
}

/* This creates another stacking context at z-index 2. */
.container-b {
  position: relative;
  z-index: 2;
}

/* Huge z-index, but trapped inside container A's context. */
.popup {
  position: absolute;
  z-index: 9999;
}
```

HTML:

```html
<!-- Popup belongs to the lower stacking context. -->
<div class="container-a">
  <div class="popup">Popup</div>
</div>

<!-- This stacking context is above container-a. -->
<div class="container-b">Content</div>
```

Even though:

```css
.popup {
  z-index: 9999;
}
```

the popup cannot simply jump outside its parent's stacking context.

Think of it like this:

```text
Container A: z-index 1
└── Popup: z-index 9999

Container B: z-index 2
```

The browser first compares:

```text
A = 1
B = 2
```

So B is above A.

The `9999` is relevant **inside A**, not against B.

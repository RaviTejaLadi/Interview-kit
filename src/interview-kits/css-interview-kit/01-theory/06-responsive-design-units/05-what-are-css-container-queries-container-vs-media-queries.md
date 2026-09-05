# CSS Container Queries (`@container`) vs Media Queries

The main difference is **what they respond to**.

### Media Query

A Media Query responds primarily to the **viewport**.

```css id="p3n8c4"
/* Change the component based on the viewport width */
@media (min-width: 768px) {
  .card {
    display: grid;
  }
}
```

Think:

```text
Browser viewport
       ↓
   @media
       ↓
   Component
```

### Container Query

A **Container Query** responds to the size of a **containing element**, rather than the entire viewport.

First, define a query container:

```css id="j6s2q9"
/* Make the parent a query container */
.card-wrapper {
  container-type: inline-size;
}
```

Then query its width:

```css id="f8k4m2"
/* Change the card when its container is at least 500px wide */
@container (min-width: 500px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### Why is this useful?

Imagine the same card component appears in:

```text
Page
├── Main content → wide card
└── Sidebar      → narrow card
```

The viewport might be 1200px wide in both cases, but the card itself has different available widths.

A Media Query sees:

```text
Viewport = 1200px
```

A Container Query sees:

```text
Main card    = 800px
Sidebar card = 300px
```

So the component can adapt to **where it is placed**, making components more reusable.

### Simple distinction

> **Media Query → "How big is the screen?"**
> **Container Query → "How much space does my container have?"**
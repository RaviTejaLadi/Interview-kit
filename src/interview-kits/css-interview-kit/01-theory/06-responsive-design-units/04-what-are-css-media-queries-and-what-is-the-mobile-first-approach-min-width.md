# What are CSS Media Queries and what is the mobile-first approach?

### Media Queries

**Media Queries** allow CSS to apply different styles depending on conditions such as:

* Viewport width
* Viewport height
* Orientation
* User's display preferences

Example:

```css id="w2k9m4"
/* Apply a different layout when the viewport is at least 768px wide */
.container {
  display: block;
}

@media (min-width: 768px) {
  .container {
    display: flex;
  }
}
```

### Mobile-first approach

**Mobile-first** means you write the base CSS for smaller screens first, then progressively enhance the layout for larger screens.

```css id="g3h7v1"
/* Mobile-first: stack items by default */
.container {
  display: flex;
  flex-direction: column;
}

/* Larger screens: switch to a horizontal layout */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

The common pattern is:

```text
Mobile styles
     ↓
@media (min-width: ...)
     ↓
Tablet / desktop enhancements
```

### Why `min-width`?

Because you're saying:

> "Start with the simple mobile layout. When the screen becomes at least this wide, add these enhancements."

This usually produces cleaner responsive CSS than starting with desktop styles and overriding them with many `max-width` rules.
# What are `grid-template-areas`?

`grid-template-areas` lets you **name sections of a grid** and then place elements into those named areas.

It makes complex layouts easier to understand because the CSS visually represents the page structure.

```css
/* Define a page layout using named grid areas */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

  grid-template-columns: 200px 1fr;
}
```

Then assign elements to those areas:

```css
/* Place each element into its named grid area */
.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

The resulting structure is:

```text
┌─────────────────────────┐
│         Header          │
├────────┬────────────────┤
│Sidebar │      Main      │
├────────┴────────────────┤
│         Footer          │
└─────────────────────────┘
```

A major benefit is that you can change the layout for responsive breakpoints by changing the area definition.

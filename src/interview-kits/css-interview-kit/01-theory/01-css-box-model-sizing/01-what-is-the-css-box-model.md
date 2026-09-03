# What is the CSS Box Model?

The **CSS Box Model** describes how every HTML element is represented as a rectangular box.

Think of an element like a **box inside another box**:

```text
┌───────────────────────────────┐
│            Margin             │
│  ┌─────────────────────────┐  │
│  │         Border          │  │
│  │  ┌───────────────────┐  │  │
│  │  │      Padding      │  │  │
│  │  │  ┌─────────────┐  │  │  │
│  │  │  │   Content   │  │  │  │
│  │  │  └─────────────┘  │  │  │
│  │  └───────────────────┘  │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

Every element has these four areas:

1. **Content** – actual text, image, etc.
2. **Padding** – space around the content
3. **Border** – line surrounding the padding
4. **Margin** – space outside the element

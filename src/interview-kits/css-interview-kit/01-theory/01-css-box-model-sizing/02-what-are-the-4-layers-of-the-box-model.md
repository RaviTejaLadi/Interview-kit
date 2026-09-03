# What are the 4 layers of the Box Model?

### 1. Content

The actual content of the element.

```css
/* The content area is 200px wide. */
.box {
  width: 200px;
}
```

For example, the text inside a `<div>` is part of the content.

---

### 2. Padding

Padding creates space **inside the element**, between the content and border.

```css
/* Adds 20px of space around the content. */
.box {
  padding: 20px;
}
```

```text
Border
┌─────────────────────┐
│      Padding        │
│   ┌─────────────┐   │
│   │   Content   │   │
│   └─────────────┘   │
└─────────────────────┘
```

**Padding = inside space**

---

### 3. Border

Border surrounds the padding and content.

```css
/* Creates a 2px solid border. */
.box {
  border: 2px solid black;
}
```

---

### 4. Margin

Margin creates space **outside the element**.

```css
/* Creates 20px of space outside the element. */
.box {
  margin: 20px;
}
```

**Margin = outside space**

### Easy way to remember

> **Content → Padding → Border → Margin**

Or:

> **Padding is inside, Margin is outside.**

# What is a Block Formatting Context (BFC) and how do you trigger one?

A **Block Formatting Context (BFC)** is an independent block-level layout environment.

You can think of it as a **mini layout boundary**.

Elements inside the BFC participate in layout without certain interactions leaking outside.

### Why is BFC useful?

One classic use is preventing **float-related layout problems**.

Another important use is preventing **margin collapsing** between certain boxes.

### Common ways to create a BFC

#### `display: flow-root`

This is the modern, explicit way.

```css
/* Creates a new Block Formatting Context. */
.container {
  display: flow-root;
}
```

This is usually the cleanest choice when you specifically want a BFC.

---

### `overflow: hidden`

Historically/common technique:

```css
/* Non-visible overflow establishes a BFC in the relevant block formatting model. */
.container {
  overflow: hidden;
}
```

But don't use `overflow: hidden` just to create a BFC if you don't want clipping/overflow behavior.

---

### `overflow: auto`

```css
/* Also establishes a BFC while allowing scrolling when necessary. */
.container {
  overflow: auto;
}
```

---

### `display: flow-root` is usually preferable

If your intention is simply:

> "Create a BFC."

Use:

```css
.container {
  display: flow-root;
}
```

It's explicit and doesn't introduce accidental clipping or scrolling.

---

## BFC vs Stacking Context

This distinction is **very important for interviews**.

| Concept              | Purpose                    |
| -------------------- | -------------------------- |
| **BFC**              | Controls block layout/flow |
| **Stacking Context** | Controls painting/layering |
| `display: flow-root` | Creates BFC                |
| `z-index`            | Controls stacking order    |
| `isolation: isolate` | Creates stacking context   |

They solve different problems.

### Easy mental model 🧠

```text
BFC
↓
"How do these boxes participate in layout?"

Stacking Context
↓
"How are these boxes painted on top of each other?"
```

And one final distinction worth remembering:

> **Containing block, BFC, and stacking context are three different concepts.** They can interact, but one should not be casually substituted for another.

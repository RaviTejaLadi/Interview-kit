# `box-sizing: content-box` vs `border-box`

This controls **how CSS calculates the width and height of an element**.

This is a very common interview question.

---

## `content-box`

`content-box` is the default CSS behavior.

When you write:

```css
/* width applies only to the content area. */
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
```

The `width: 200px` applies only to the **content**.

So the actual width becomes:

```text
Content = 200px
Padding = 20px + 20px = 40px
Border  = 5px + 5px = 10px

Total = 200 + 40 + 10
      = 250px
```

So although you wrote `width: 200px`, the element actually occupies **250px** horizontally.

---

## `border-box`

With `border-box`, the specified width includes:

* Content
* Padding
* Border

```css
/* width includes content, padding, and border. */
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
```

Now:

```text
Total width = 200px
```

The browser calculates the content area as:

```text
200 - 40 padding - 10 border
= 150px content
```

So:

```text
┌────────────── 200px ──────────────┐
│ Border + Padding + Content         │
└────────────────────────────────────┘
```

### Quick comparison

| `box-sizing`  | `width` includes           |
| ------------- | -------------------------- |
| `content-box` | Content only               |
| `border-box`  | Content + Padding + Border |

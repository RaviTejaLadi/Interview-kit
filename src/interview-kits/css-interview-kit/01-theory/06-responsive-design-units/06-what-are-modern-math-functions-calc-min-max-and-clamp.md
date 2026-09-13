# Modern math functions: `calc()`, `min()`, `max()`, and `clamp()`

CSS provides mathematical functions for creating flexible values.

## `calc()`

`calc()` performs calculations between CSS values.

```css id="h3w7k2"
/* Calculate the width by subtracting fixed spacing from the viewport */
.container {
  width: calc(100% - 40px);
}
```

You can combine different units:

```css id="n9p2x6"
/* Combine viewport and pixel units */
.hero {
  height: calc(100vh - 80px);
}
```

---

## `min()`

`min()` chooses the **smallest** value.

```css id="c5v8m1"
/* Width will never exceed 800px */
.container {
  width: min(100%, 800px);
}
```

Meaning:

```text
Choose the smaller of:

100%
800px
```

This is a very useful pattern for responsive containers.

---

## `max()`

`max()` chooses the **largest** value.

```css id="r4k7p3"
/* Keep at least 20px of horizontal space */
.container {
  padding-inline: max(20px, 5vw);
}
```

The browser chooses whichever value is larger.

---

## `clamp()`

`clamp()` provides a **minimum, preferred, and maximum** value.

Syntax:

```text
clamp(minimum, preferred, maximum)
```

Example:

```css id="u8m2q5"
/* Keep the heading between 24px and 48px while scaling with the viewport */
h1 {
  font-size: clamp(24px, 5vw, 48px);
}
```

The browser tries to use:

```text
24px minimum
     ↓
   5vw preferred
     ↓
48px maximum
```

So the font can grow smoothly with the viewport but never becomes smaller than `24px` or larger than `48px`.

### Quick comparison

| Function  | Purpose                            |
| --------- | ---------------------------------- |
| `calc()`  | Perform calculations               |
| `min()`   | Choose the smallest value          |
| `max()`   | Choose the largest value           |
| `clamp()` | Stay between a minimum and maximum |

A useful way to remember:

```text
calc()  → calculate
min()   → don't exceed this smaller value
max()   → don't go below this larger value
clamp() → stay within a range
```

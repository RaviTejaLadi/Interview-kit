# What is Margin Collapsing?

**Margin collapsing** happens when the vertical margins of certain block elements combine instead of adding together.

For example:

```css
/* Each paragraph has a vertical margin. */
.first {
  margin-bottom: 30px;
}

.second {
  margin-top: 20px;
}
```

You might expect:

```text
30 + 20 = 50px
```

But normally the margins **collapse**.

The resulting space is:

```text
30px
```

The larger margin wins.

```text
Element 1
   ↓
30px margin
   ↓
20px margin
   ↓
Element 2

Result = 30px
```

### Another example

```css
/* Adjacent block margins collapse to the larger value. */
.box1 {
  margin-bottom: 40px;
}

.box2 {
  margin-top: 20px;
}
```

The distance between them is:

```text
40px
```

Not:

```text
60px
```

### Important

Margin collapsing mainly applies to **vertical margins**.

Horizontal margins generally do **not** collapse.

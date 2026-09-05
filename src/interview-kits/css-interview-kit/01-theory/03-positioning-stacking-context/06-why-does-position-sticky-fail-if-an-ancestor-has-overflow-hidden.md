# Why does `position: sticky` fail if an ancestor has `overflow: hidden`?

This needs a small correction:

> `overflow: hidden` does **not universally make `sticky` fail**.

The real issue is that an ancestor with non-`visible` overflow can become the relevant **scrolling/overflow container** for sticky positioning.

For example:

```css
/* This can change which ancestor controls sticky scrolling. */
.parent {
  overflow: hidden;
}

.title {
  position: sticky;
  top: 0;
}
```

If `.parent` doesn't provide the scrolling area that you expect, the sticky element may appear not to work.

### Why?

Think of sticky as asking:

> "Which container am I supposed to stick within?"

Changing an ancestor's `overflow` can change that answer.

### Common debugging checklist

If sticky doesn't work:

1. Check `top`, `bottom`, etc.
2. Check ancestors for `overflow: hidden/auto/scroll/clip`.
3. Check whether the sticky element has enough scrollable space.
4. Check the height of the parent/container.
5. Check whether another ancestor is actually the scrolling container.

For example:

```css
/* Make the intended container the scrolling area. */
.container {
  height: 400px;
  overflow: auto;
}

.header {
  position: sticky;
  top: 0;
}
```

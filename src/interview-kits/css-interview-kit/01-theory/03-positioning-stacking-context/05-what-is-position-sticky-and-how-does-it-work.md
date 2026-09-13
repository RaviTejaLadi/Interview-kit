# What is `position: sticky` and how does it work?

`sticky` is a combination of **relative positioning + scrolling behavior**.

The element behaves normally until it reaches a specified threshold. Then it "sticks" within its scrolling container.

```css
/* The heading sticks to the top while its container is being scrolled. */
.heading {
  position: sticky;
  top: 0;
}
```

For example:

```text
Before scrolling:

Heading
────────────
Content
Content
Content
```

After scrolling:

```text
Heading  ← stays here
────────────
Content
Content
Content
```

### Important

`sticky` needs an offset such as:

```css
top: 0;
```

or:

```css
bottom: 0;
```

Without an inset/offset, there is usually no sticking behavior to observe.

### Another important point

Sticky positioning is constrained by its **scrolling container** and its containing block. It doesn't simply stick to the viewport forever.

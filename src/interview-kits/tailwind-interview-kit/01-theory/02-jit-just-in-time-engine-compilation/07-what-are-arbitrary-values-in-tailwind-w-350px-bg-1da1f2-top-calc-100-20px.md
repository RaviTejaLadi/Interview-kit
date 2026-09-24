# What are arbitrary values in Tailwind (`w-[350px]`, `bg-[#1da1f2]`, `top-[calc(100%-20px)]`)?

**Arbitrary values** allow you to provide a custom CSS value directly inside a Tailwind utility using square brackets `[]`.

Instead of being limited to Tailwind's predefined values:

```html
<!-- Use a custom width that isn't necessarily in the default scale -->
<div class="w-[350px]">
  Content
</div>
```

The syntax is:

```text
utility-[custom-value]
```

---

## Example: Custom width

```html
<!-- Generate width: 350px -->
<div class="w-[350px]">
  Content
</div>
```

Conceptually:

```css
/* Generated CSS is conceptually equivalent to this */
width: 350px;
```

---

## Example: Custom color

```html
<!-- Generate a custom background color -->
<div class="bg-[#1da1f2]">
  Twitter-style blue
</div>
```

Conceptually:

```css
/* Generated CSS is conceptually equivalent to this */
background-color: #1da1f2;
```

---

## Example: Custom positioning

```html
<!-- Generate a custom top offset -->
<div class="top-[20px]">
  Content
</div>
```

---

## Example: `calc()`

```html
<!-- Use a custom CSS calculation -->
<div class="top-[calc(100%-20px)]">
  Content
</div>
```

For Tailwind syntax, spaces inside arbitrary values may need to be represented appropriately. For example:

```html
<!-- Use underscores where a space is needed inside an arbitrary value -->
<div class="top-[calc(100%_-_20px)]">
  Content
</div>
```

This represents:

```css
/* Equivalent CSS calculation */
top: calc(100% - 20px);
```
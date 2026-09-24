# How do you target a specific screen range in Tailwind?

Tailwind lets you combine a minimum breakpoint with a `max-*` variant.

For example, suppose you want something to apply only between `md` and `lg`:

```html
<!-- Apply the style from md up to, but not including, lg -->
<div class="md:max-lg:bg-blue-500">
  Content
</div>
```

Conceptually:

```text
768px ≤ viewport < 1024px
```

You can also use arbitrary maximum breakpoints when needed:

```html
<!-- Apply only while the viewport is below 900px -->
<div class="max-[900px]:bg-red-500">
  Content
</div>
```

### Example

```html
<!-- Different layout for each responsive range -->
<div
  class="
    bg-gray-100
    md:max-lg:bg-blue-100
    lg:max-xl:bg-green-100
    xl:bg-purple-100
  "
>
  Content
</div>
```

Conceptually:

```text
< 768px        → gray
768–1023px     → blue
1024–1279px    → green
≥ 1280px       → purple
```

### Interview point

> Tailwind is mobile-first, but you can combine `min-width` and `max-width` variants when you need an explicit range.

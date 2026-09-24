# What are Tailwind's default responsive breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`)?

In the **Tailwind v3 default configuration**, the standard breakpoints are:

| Prefix | Minimum width | Typical meaning |
| ------ | ------------: | --------------- |
| `sm`   |       `640px` | Small screens   |
| `md`   |       `768px` | Tablets         |
| `lg`   |      `1024px` | Laptops         |
| `xl`   |      `1280px` | Desktops        |
| `2xl`  |      `1536px` | Large desktops  |

For example:

```html
<!-- Change the text size at different viewport widths -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Responsive heading</h1>
```

This means:

```text
< 640px       → text-2xl
≥ 640px       → text-3xl
≥ 768px       → text-4xl
≥ 1024px      → text-5xl
```

### Important

These are **minimum-width breakpoints**, not device categories.

Don't think:

```text
sm = mobile
md = tablet
lg = laptop
```

Think:

```text
md: = apply this utility when viewport width >= 768px
```

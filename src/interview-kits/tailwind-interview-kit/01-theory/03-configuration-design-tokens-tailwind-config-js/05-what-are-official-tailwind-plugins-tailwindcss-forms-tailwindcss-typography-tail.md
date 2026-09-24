# What are official Tailwind plugins (`@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio`)?

Tailwind plugins extend Tailwind with additional functionality that isn't provided directly by the core utility set.

Some well-known official plugins in the Tailwind v3 ecosystem include:

### `@tailwindcss/forms`

Provides better default styling and reset behavior for form controls.

Examples:

```html
<!-- Form controls can use Tailwind's form plugin styles -->
<input type="text" class="rounded-md border-gray-300" />
```

It helps normalize controls such as:

- `<input>`
- `<select>`
- `<textarea>`
- `<checkbox>`
- `<radio>`

---

### `@tailwindcss/typography`

Provides the `prose` utility for styling long-form content.

For example:

```html
<!-- The prose utility provides typography suitable for long-form content -->
<article class="prose">
  <h1>My Article</h1>
  <p>This is a paragraph of article content.</p>
</article>
```

It's especially useful for:

- Markdown content
- Blog posts
- Documentation
- CMS content

Instead of individually styling every:

```text
h1
h2
p
ul
ol
blockquote
code
table
```

the `prose` class provides a coherent typography system.

---

### `@tailwindcss/aspect-ratio`

Provides utilities for controlling an element's aspect ratio.

For example:

```html
<!-- Keep the video container at a 16:9 ratio -->
<div class="aspect-w-16 aspect-h-9">
  <iframe src="..."></iframe>
</div>
```

However, **modern Tailwind versions have native `aspect-ratio` utilities**, so this plugin is generally unnecessary for new projects.

For example:

```html
<!-- Modern Tailwind has built-in aspect-ratio utilities -->
<div class="aspect-video">
  <iframe src="..."></iframe>
</div>
```

### Interview point

> Plugins allow Tailwind to be extended with additional utilities, components, or variants.

# What is the importance of the `alt` attribute on `<img>`?

The `alt` attribute provides **alternative text** for an image.

It is especially important for users who cannot see the image and rely on screen readers.

```html
<!-- Descriptive alt text communicates the image's meaningful content -->
<img src="developer.jpg" alt="Developer working on a laptop" />
```

A screen reader can announce the alternative text instead of the image itself.

### Meaningful image

Provide descriptive `alt` text:

```html
<!-- The alt text describes the important information in the image -->
<img src="sales-chart.png" alt="Sales increased by 25% in 2026" />
```

### Decorative image

If an image is purely decorative and adds no meaningful information, use an empty `alt`:

```html
<!-- Empty alt tells assistive technology to ignore this decorative image -->
<img src="decorative-line.svg" alt="" />
```

### Don't do this

```html
<!-- Avoid meaningless alt text -->
<img src="developer.jpg" alt="image" />
```

`alt="image"` does not communicate useful information.

### Important distinction

`alt` text should describe the **purpose or meaning** of the image, not necessarily every visual detail.

For example, if an image is a button containing a search icon, the useful alternative might be:

```html
<!-- The alt text describes the action represented by the image -->
<button>
  <img src="search.svg" alt="Search" />
</button>
```

In some cases, if the button itself already has an accessible name, the image should be decorative:

```html
<!-- The button provides the accessible name, so the icon is decorative -->
<button aria-label="Search">
  <img src="search.svg" alt="" />
</button>
```

## Quick Accessibility Cheat Sheet ⭐

| Concept                 | Key idea                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| **a11y**                | Making websites usable by people with disabilities                     |
| **Accessibility Tree**  | Browser's accessibility representation exposed to assistive technology |
| **ARIA**                | Attributes that add accessibility semantics                            |
| **First Rule of ARIA**  | Prefer native HTML over unnecessary ARIA                               |
| **ARIA role**           | Describes what an element is                                           |
| **ARIA state**          | Describes the current condition                                        |
| **ARIA property**       | Provides additional information/relationships                          |
| `aria-label`            | Gives an accessible name directly                                      |
| `aria-labelledby`       | Gets the accessible name from another element                          |
| `aria-describedby`      | Provides additional descriptive information                            |
| `aria-live="polite"`    | Announces updates without normally interrupting                        |
| `aria-live="assertive"` | Announces important updates immediately                                |
| `tabindex="0"`          | Adds an element to normal tab navigation                               |
| `tabindex="-1"`         | Programmatically focusable, not in normal Tab order                    |
| `<div onClick>`         | Usually an inaccessible substitute for an interactive element          |
| `alt`                   | Alternative text for images                                            |

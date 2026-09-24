# What is the Utility-First paradigm?

**Utility-first** means that instead of creating semantic classes such as `.card`, `.button`, or `.header`, you primarily use **single-purpose classes** that represent individual CSS properties.

For example:

```html
<!-- Each class represents a specific styling responsibility -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
```

Each utility does something specific:

| Utility             | Meaning            |
| ------------------- | ------------------ |
| `px-4`              | Horizontal padding |
| `py-2`              | Vertical padding   |
| `bg-blue-600`       | Background color   |
| `text-white`        | Text color         |
| `rounded-md`        | Border radius      |
| `hover:bg-blue-700` | Hover background   |

Think of utilities as **LEGO blocks**. You combine small blocks to create a component.

### Traditional CSS

```css
/* Define a semantic component class */
.button {
  padding: 8px 16px;
  background: blue;
  color: white;
  border-radius: 6px;
}
```

```html
<!-- Use the semantic class -->
<button class="button">Save</button>
```

### Tailwind

```html
<!-- Compose the same styles from utilities -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
```

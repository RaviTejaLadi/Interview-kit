# Markup an accessible navigation bar with submenus

An accessible navigation bar should provide:

- Semantic `<nav>`
- Clear navigation labels
- Keyboard-accessible controls
- `aria-haspopup="true"` to indicate that a control opens a submenu
- `aria-expanded="false/true"` to communicate submenu state

`aria-expanded` must be updated when the submenu opens or closes.

```html
<!-- Accessible navigation with a submenu and expandable state -->
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/">Home</a>
    </li>

    <li>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="products-menu"
      >
        Products
      </button>

      <ul id="products-menu" hidden>
        <li><a href="/products/software">Software</a></li>
        <li><a href="/products/hardware">Hardware</a></li>
        <li><a href="/products/services">Services</a></li>
      </ul>
    </li>

    <li>
      <a href="/about">About</a>
    </li>

    <li>
      <a href="/contact">Contact</a>
    </li>
  </ul>
</nav>
```

JavaScript can control the submenu state:

```javascript
// Toggle the submenu and keep aria-expanded synchronized with its visibility
const button = document.querySelector('button[aria-controls="products-menu"]');

const menu = document.querySelector('#products-menu');

button.addEventListener('click', () => {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', String(!isExpanded));
  menu.hidden = isExpanded;
});
```

### Important distinction

`aria-haspopup="true"` means:

> "This control opens a popup/submenu."

`aria-expanded` means:

> "This popup/submenu is currently open or closed."

For a submenu button, **`<button>` is preferable to a clickable `<div>`** because it already provides keyboard and interaction semantics.

# What is ARIA?

**ARIA** stands for **Accessible Rich Internet Applications**.

It is a set of HTML attributes that can provide additional **accessibility semantics** to elements, especially for dynamic or custom UI components.

ARIA attributes usually start with `aria-`.

Examples:

```html
<!-- ARIA provides additional information to assistive technologies -->
<button aria-expanded="false" aria-controls="menu">Menu</button>

<ul id="menu" hidden>
  <li>Home</li>
  <li>About</li>
</ul>
```

ARIA can communicate information such as:

- Role
- State
- Relationship
- Accessible name
- Dynamic updates

### Important

ARIA **does not add functionality by itself**.

For example:

```html
<!-- This does NOT automatically make a div behave like a button -->
<div role="button">Click me</div>
```

You would still need to implement:

- Click behavior
- Keyboard behavior
- Focus management
- Appropriate states

Whenever possible, use **native HTML elements first**.

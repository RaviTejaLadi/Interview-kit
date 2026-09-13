# What is the Accessibility Tree?

The **Accessibility Tree** is a browser-generated representation of a webpage that exposes the information needed by **assistive technologies**, such as screen readers.

It is derived from the DOM, but it is **not the same as the DOM tree**.

For example:

```html
<!-- This DOM structure produces meaningful accessibility information -->
<button aria-label="Close dialog">×</button>
```

The browser can expose information similar to:

```text
Role: button
Name: Close dialog
```

A screen reader can then announce something like:

> "Close dialog, button"

The accessibility tree typically contains information such as:

- **Role** — button, heading, link, textbox, etc.
- **Accessible name** — what the element is called
- **State** — checked, expanded, disabled, etc.
- **Properties** — additional information about the element

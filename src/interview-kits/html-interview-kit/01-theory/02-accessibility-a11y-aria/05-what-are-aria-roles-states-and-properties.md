# What are ARIA roles, states, and properties?

ARIA attributes can generally be understood as **roles, states, and properties**.

## ARIA Roles

A **role** describes what an element represents.

Examples:

```html
<!-- ARIA roles describe the purpose of an element -->
<div role="dialog">
  Dialog content
</div>

<div role="alert">
  Something went wrong.
</div>
```

Examples of roles:

* `button`
* `dialog`
* `alert`
* `navigation`
* `tab`
* `tabpanel`
* `checkbox`

---

## ARIA States

A **state** describes the current condition of an element.

Examples:

* `aria-expanded`
* `aria-checked`
* `aria-selected`
* `aria-disabled`
* `aria-hidden`

```html
<!-- aria-expanded communicates the current expanded state -->
<button aria-expanded="false">
  Menu
</button>
```

The value can change when the UI changes:

```html
<!-- The menu is now expanded -->
<button aria-expanded="true">
  Menu
</button>
```

---

## ARIA Properties

**Properties** provide additional information or relationships about an element.

Examples:

* `aria-label`
* `aria-labelledby`
* `aria-describedby`
* `aria-controls`
* `aria-haspopup`

```html
<!-- aria-controls establishes a relationship with another element -->
<button aria-controls="settings-panel">
  Settings
</button>

<div id="settings-panel">
  Settings content
</div>
```

### Simple way to remember

| Type         | Purpose                                                | Example                   |
| ------------ | ------------------------------------------------------ | ------------------------- |
| **Role**     | What is it?                                            | `role="dialog"`           |
| **State**    | What condition is it in?                               | `aria-expanded="true"`    |
| **Property** | What additional information/relationship does it have? | `aria-describedby="help"` |

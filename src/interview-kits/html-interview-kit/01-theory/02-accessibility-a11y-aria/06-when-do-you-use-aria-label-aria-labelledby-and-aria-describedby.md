# When do you use `aria-label`, `aria-labelledby`, and `aria-describedby`?

These attributes help provide an element's **accessible name or description**.

## `aria-label`

Use `aria-label` when an element needs an accessible name but **doesn't have suitable visible text**.

Example:

```html
<!-- aria-label gives this icon-only button an accessible name -->
<button aria-label="Close">×</button>
```

A screen reader can identify it as:

> "Close, button"

### Common use case

Icon-only buttons.

---

## `aria-labelledby`

Use `aria-labelledby` when the accessible name should come from **visible text in another element**.

```html
<!-- aria-labelledby uses the visible heading as the dialog's accessible name -->
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Delete Account</h2>

  <p>Are you sure you want to delete your account?</p>
</div>
```

Here, `dialog` gets its accessible name from the `<h2>`.

### Prefer it when:

There is already visible text that should serve as the name.

---

## `aria-describedby`

Use `aria-describedby` when you want to provide **additional descriptive information**.

```html
<!-- aria-describedby connects the input to its additional help text -->
<label for="password">Password</label>

<input id="password" type="password" aria-describedby="password-help" />

<p id="password-help">Password must contain at least 8 characters.</p>
```

A screen reader can associate the help text with the input.

### Easy distinction

```text
aria-label        → What is this?
aria-labelledby   → Name comes from this element.
aria-describedby  → Give me additional information.
```

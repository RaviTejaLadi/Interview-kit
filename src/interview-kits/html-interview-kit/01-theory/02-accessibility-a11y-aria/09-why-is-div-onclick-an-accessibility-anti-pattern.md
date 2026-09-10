# Why is `<div onClick="...">` an accessibility anti-pattern?

A `<div>` is a **generic non-interactive element**. It does not natively behave like a button.

For example:

```html
<!-- Accessibility anti-pattern: div does not provide button behavior -->
<div onclick="submitForm()">
  Submit
</div>
```

Problems include:

* Not naturally keyboard accessible
* Incorrect semantic role
* No native button behavior
* Focus behavior is missing
* Screen readers may not identify it as a button

The correct solution is usually:

```html
<!-- Native button provides accessible interaction by default -->
<button type="button" onclick="submitForm()">
  Submit
</button>
```

A native `<button>` supports keyboard interaction such as **Enter/Space activation**, focus, and proper semantics.

### React example

Avoid:

```jsx
// Avoid using a generic div as an interactive control.
<div onClick={handleSubmit}>Submit</div>
```

Prefer:

```jsx
// Use the native button element for built-in accessibility.
<button type="button" onClick={handleSubmit}>
  Submit
</button>
```

If you genuinely need a custom interactive widget, you may need ARIA, keyboard handling, focus management, and appropriate state management—but **native HTML should be the first choice**.

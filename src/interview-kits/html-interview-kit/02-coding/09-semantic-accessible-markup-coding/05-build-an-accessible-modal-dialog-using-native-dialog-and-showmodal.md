# Build an accessible modal dialog using native `<dialog>` and `showModal()`

The native **`<dialog>`** element provides built-in browser support for dialogs. Calling **`showModal()`** opens it as a modal dialog.

A modal dialog should have:

* A meaningful heading
* An accessible name
* A close button
* `method="dialog"` or JavaScript for closing
* Keyboard support provided by the native dialog
* A backdrop when opened modally

```html
<!-- Accessible native modal dialog opened with showModal() -->
<button type="button" id="open-dialog">
  Delete account
</button>

<dialog id="delete-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Delete account?</h2>

  <p>
    This action cannot be undone. Are you sure you want to delete your account?
  </p>

  <form method="dialog">
    <button type="submit">Cancel</button>
    <button type="submit" value="delete">Delete account</button>
  </form>
</dialog>

<script>
  const dialog = document.querySelector("#delete-dialog");
  const openButton = document.querySelector("#open-dialog");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
</script>
```

You can also style the modal backdrop:

```css
/* Style the backdrop created when the dialog is opened modally */
dialog::backdrop {
  background: rgb(0 0 0 / 50%);
}
```

### Why `<dialog>` is better than building a modal from `<div>`

A native `<dialog>` provides important modal behavior that would otherwise require significant JavaScript, including:

* Modal/top-layer behavior
* Focus handling
* Keyboard interaction such as Escape
* Built-in closing mechanisms
* Backdrop support

---

# ⭐ Quick Interview Cheat Sheet

| Question           | Key answer                                                     |
| ------------------ | -------------------------------------------------------------- |
| Semantic document  | Uses meaningful elements and accessibility landmarks           |
| Accessible form    | Labels + descriptions + validation/error semantics             |
| Blog article       | `<article>` + heading hierarchy + `<time>` + author + tags     |
| Accessible submenu | `<nav>` + `<button>` + `aria-haspopup` + `aria-expanded`       |
| Native modal       | `<dialog>` + `showModal()` + accessible name + close mechanism |

**Best practice to remember:** use **native HTML semantics first**, and use ARIA only when native HTML doesn't already provide the required semantics or state.

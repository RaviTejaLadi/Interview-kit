# What is the native `<dialog>` element and `showModal()` API?

The **`<dialog>`** element is a native HTML element used to create **dialogs, modals, and popup interactions** without building the basic dialog behavior from scratch.

The `showModal()` method opens the dialog as a **modal**, meaning the user must interact with the dialog before interacting with the rest of the page.

### Key points

* Native HTML modal support.
* Can be opened with JavaScript.
* Modal dialogs create a **top-layer** UI.
* Supports a built-in `::backdrop` pseudo-element.
* `close()` closes the dialog.

```html
<!-- Open and close a native modal dialog -->
<dialog id="myDialog">
  <h2>Delete item?</h2>
  <p>Are you sure you want to delete this item?</p>
  <button onclick="myDialog.close()">Cancel</button>
  <button onclick="myDialog.close()">Delete</button>
</dialog>

<button onclick="myDialog.showModal()">Delete</button>
```

**`show()` vs `showModal()`**

* `show()` → opens a non-modal dialog.
* `showModal()` → opens a modal dialog and blocks interaction with the rest of the page.
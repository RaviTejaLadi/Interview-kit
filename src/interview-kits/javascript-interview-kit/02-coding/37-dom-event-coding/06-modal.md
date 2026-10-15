# Modal.

A modal is a dialog that appears above the main page content. It is commonly used for confirmations, login forms, and settings.

The native HTML `<dialog>` element provides useful built-in behavior.

// JavaScript: Open and close a native modal dialog.

```
<button id="openModal">Open Modal</button>

<dialog id="myModal" aria-labelledby="modalTitle">
  <h2 id="modalTitle">Confirm Action</h2>
  <p>Are you sure you want to continue?</p>

  <button id="confirmAction">Confirm</button>
  <button id="closeModal">Cancel</button>
</dialog>

<script>
  const dialog = document.getElementById("myModal");

  document.getElementById("openModal").addEventListener("click", () => {
    dialog.showModal();
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    dialog.close("cancel");
  });

  document.getElementById("confirmAction").addEventListener("click", () => {
    dialog.close("confirm");
  });

  dialog.addEventListener("close", () => {
    console.log("Dialog result:", dialog.returnValue);
  });
</script>
```

// CSS: Add basic spacing and a backdrop to the dialog.

```
dialog {
  border: none;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: calc(100% - 48px);
}

dialog::backdrop {
  background: rgb(0 0 0 / 50%);
}

dialog button {
  margin-right: 8px;
}
```

### How it works

- `showModal()` opens a modal dialog.
- `close()` closes it and optionally provides a result.
- `returnValue` exposes the result when the dialog closes.
- The browser handles many native dialog behaviors, including Escape-key dismissal.

Gotcha: If you build a custom modal instead, you must handle focus trapping, focus restoration, keyboard dismissal, and appropriate ARIA attributes.

# What is `peer` and `peer-checked` / `peer-focus` (styling sibling elements)?

`peer` is similar to `group`, but it works with **sibling elements rather than children**.

### Basic idea

```text id="f7w4k3"
Parent
 ├── Input       ← peer
 └── Label       ← peer-checked reacts to input
```

Example:

```html id="2e5o1q"
<!-- Let the label react to the checkbox state -->
<div>
  <input
    id="terms"
    type="checkbox"
    class="peer"
  />

  <label
    for="terms"
    class="text-gray-500 peer-checked:text-blue-600"
  >
    Accept terms
  </label>
</div>
```

When the checkbox is checked:

```text id="5v1n0s"
input:checked
      ↓
peer-checked
      ↓
label changes
```

---

## `peer-focus`

You can also react to a sibling receiving focus.

```html id="a6j5r7"
<!-- Change the label when the associated input receives focus -->
<div>
  <input
    type="text"
    class="peer border"
    placeholder=" "
  />

  <label class="text-gray-500 peer-focus:text-blue-600">
    Name
  </label>
</div>
```

This pattern is useful for:

- Floating labels
- Custom checkboxes
- Custom radio buttons
- Form validation UI
- Interactive form controls

### Important HTML limitation

The peer generally needs to appear **before the element reacting to it** because the underlying CSS relationship uses a subsequent-sibling selector.

Conceptually:

```css id="7s7pkn"
/* Simplified peer relationship */
.peer:checked ~ .peer-checked\:text-blue-600 {
  ...
}
```

So this works:

```text id="i9x4rd"
<input class="peer">
<label class="peer-checked:...">
```

but the reverse sibling order generally won't work the same way.

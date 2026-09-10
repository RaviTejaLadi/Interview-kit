# How does keyboard navigation work natively in HTML?

Keyboard accessibility allows users to navigate and operate a website without a mouse.

Native interactive HTML elements such as:

* `<button>`
* `<a href="...">`
* `<input>`
* `<select>`
* `<textarea>`

already provide keyboard behavior.

The `tabindex` attribute controls an element's **focusability and tab order**.

## `tabindex="0"`

Makes an element **focusable using the normal keyboard tab order**.

```html
<!-- tabindex=0 adds the element to the natural tab sequence -->
<div tabindex="0">
  Focusable content
</div>
```

However, don't use `tabindex="0"` to turn generic elements into interactive controls unless there is a strong reason. Prefer native controls.

---

## `tabindex="-1"`

Makes an element **programmatically focusable but not part of the normal Tab sequence**.

```html
<!-- tabindex=-1 allows JavaScript to focus this heading when needed -->
<h2 id="dialog-title" tabindex="-1">
  Delete Account
</h2>
```

JavaScript can then focus it:

```javascript
// Move keyboard focus to the heading when the dialog opens.
document.getElementById("dialog-title").focus();
```

This is commonly useful for:

* Dialog focus management
* Error messages
* SPA route changes
* Managing focus after dynamic content updates

### Important

Avoid positive values such as:

```html
<!-- Avoid positive tabindex values -->
<button tabindex="1">Button</button>
```

Positive `tabindex` values create a custom tab order that is difficult to maintain and can create confusing keyboard navigation.

### Quick comparison

| `tabindex`     | Meaning                                        |
| -------------- | ---------------------------------------------- |
| Not specified  | Uses element's native behavior                 |
| `0`            | Focusable in normal tab order                  |
| `-1`           | Focusable programmatically, not via normal Tab |
| Positive value | Custom tab order — generally avoid             |

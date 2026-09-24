# How do you style pseudo-classes (`hover:`, `focus:`, `active:`, `focus-visible:`, `disabled:`)?

Tailwind provides variants for common CSS pseudo-classes.

The general syntax is:

```text
variant:utility
```

### `hover:`

Applies when the pointer is over the element.

```html id="0u6v4e"
<!-- Change the button background on hover -->
<button class="bg-blue-600 hover:bg-blue-700 text-white">
  Save
</button>
```

Equivalent CSS conceptually:

```css id="jv9h43"
/* Apply the darker background while hovering */
button:hover {
  background-color: ...;
}
```

---

### `focus:`

Applies when an element receives focus.

```html id="4x1w4x"
<!-- Add a visible focus ring when the input receives focus -->
<input
  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
/>
```

This is especially important for keyboard accessibility.

---

### `active:`

Applies while an element is being activated, such as during a mouse click.

```html id="9d7x5r"
<!-- Slightly darken the button while it is being pressed -->
<button class="bg-blue-600 active:bg-blue-800">
  Save
</button>
```

---

### `focus-visible:`

`focus-visible:` is useful when you want to show focus styling when the browser determines that a **visible focus indicator is appropriate**, commonly for keyboard navigation.

```html id="8f6b0c"
<!-- Show a focus ring when focus should be visibly indicated -->
<button class="focus-visible:ring-2 focus-visible:ring-blue-500">
  Save
</button>
```

This is generally preferable to using only `focus:` when you want to avoid unnecessary focus rings from pointer interaction.

---

### `disabled:`

Applies when a form control has the `disabled` attribute.

```html id="3xq4rq"
<!-- Style the button differently when it is disabled -->
<button
  disabled
  class="bg-blue-600 text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  Saving...
</button>
```

### Common state variants

```text id="n6q5cx"
hover:
focus:
focus-visible:
active:
disabled:
checked:
required:
invalid:
visited:
```

You can combine variants too:

```html id="b9f4b1"
<!-- Apply hover styling only when the button is not disabled -->
<button class="enabled:hover:bg-blue-700 disabled:opacity-50">
  Save
</button>
```
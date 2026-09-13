# How do you link `<label>` and `<input>` properly?

There are two valid approaches.

## Explicit association

Use the label's `for` attribute and match it with the input's `id`.

```html
<!-- Explicitly associate the label with the input using for and id -->
<label for="email">Email address</label>
<input id="email" name="email" type="email" />
```

The values must match:

```text
label for="email"
        ↓
input id="email"
```

Benefits:

- Clicking the label focuses the input.
- Screen readers can correctly associate the label.
- Works even when the elements aren't nested.

---

## Implicit association

Put the input inside the label.

```html
<!-- Nesting the input inside the label creates an implicit association -->
<label>
  Email address
  <input name="email" type="email" />
</label>
```

Both approaches are valid.

### Recommended practice

Explicit association is often easier to maintain:

```html
<label for="username">Username</label> <input id="username" name="username" type="text" />
```

### Important distinction

`for` connects to the input's **`id`**, not its `name`.

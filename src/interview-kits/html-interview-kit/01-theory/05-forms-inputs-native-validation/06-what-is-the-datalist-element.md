# What is the `<datalist>` element?

`<datalist>` provides a list of **suggested options** for an `<input>`.

The user can generally type their own value as well as choose from the suggestions.

Example:

```html
<!-- Provide suggestions while still allowing the user to enter another value -->
<label for="browser">Choose a browser</label>

<input id="browser" name="browser" list="browsers" />

<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
  <option value="Edge"></option>
</datalist>
```

Relationship:

```text
input list="browsers"
        ↓
datalist id="browsers"
```

### `<datalist>` vs `<select>`

`<select>` generally restricts the user to the available options.

`<datalist>` provides **suggestions**, but the user can typically enter a value that isn't in the list.

```text
<select>
  → Choose from predefined options

<datalist>
  → Choose a suggestion OR type your own value
```

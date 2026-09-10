# How does native HTML5 form validation work?

HTML provides built-in client-side validation through attributes such as:

* `required`
* `pattern`
* `min`
* `max`
* `step`
* `minlength`
* `maxlength`
* `type`

The browser performs validation when the user submits the form.

## `required`

Specifies that a field must have a value.

```html
<!-- The browser prevents submission if the email field is empty -->
<input type="email" name="email" required />
```

---

## `pattern`

Requires the value to match a **regular expression**.

```html
<!-- Require exactly 10 digits for the phone number -->
<input
  type="tel"
  name="phone"
  pattern="[0-9]{10}"
  required
/>
```

The browser prevents submission if the value doesn't match the pattern.

---

## `min` and `max`

Define minimum and maximum allowed values.

```html
<!-- Allow ages from 18 through 100 -->
<input
  type="number"
  name="age"
  min="18"
  max="100"
  required
/>
```

They can also be used with date and other appropriate input types.

---

## `step`

Defines the permitted increment between values.

```html
<!-- Allow values such as 0, 0.5, 1, 1.5, etc. -->
<input
  type="number"
  name="rating"
  min="0"
  max="5"
  step="0.5"
/>
```

### Example

```text
min = 0
max = 5
step = 0.5

Valid:   0, 0.5, 1, 1.5, 2...
Invalid: 0.3, 1.2, 4.7...
```

### Important

Client-side validation is **not a security mechanism**.

The server must validate submitted data as well because users can bypass browser validation.

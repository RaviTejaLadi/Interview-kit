# Build an accessible registration form

An **accessible form** provides clear labels, instructions, error messages, and appropriate semantics so that keyboard users and assistive technologies can understand and operate it.

Important techniques include:

- Use `<label>` for every form control.
- Associate labels with inputs using `for` and `id`.
- Use `aria-describedby` for helper text/errors.
- Use `aria-invalid="true"` when a field contains an error.
- Use an `aria-live` region to announce dynamic errors.
- Use a proper `<button type="submit">`.

```html
<!-- Accessible registration form with labels, helper text, and error announcements -->
<form action="/register" method="post">
  <h1>Create an Account</h1>

  <div>
    <label for="name">Full name</label>
    <input
      id="name"
      name="name"
      type="text"
      autocomplete="name"
      required
      aria-describedby="name-help"
    />
    <p id="name-help">Enter your first and last name.</p>
  </div>

  <div>
    <label for="email">Email address</label>
    <input
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      required
      aria-describedby="email-help email-error"
      aria-invalid="true"
    />

    <p id="email-help">We'll use this email to sign you in.</p>

    <!-- This region can be updated dynamically when validation fails -->
    <p id="email-error" role="alert">Please enter a valid email address.</p>
  </div>

  <div>
    <label for="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      autocomplete="new-password"
      required
      minlength="8"
      aria-describedby="password-help"
    />
    <p id="password-help">Password must contain at least 8 characters.</p>
  </div>

  <button type="submit">Create account</button>
</form>
```

### Key accessibility attributes

- **`aria-describedby`** → associates helper/error text with the input.
- **`aria-invalid="true"`** → indicates that the current value is invalid.
- **`role="alert"`** → causes an important dynamically displayed error to be announced by many screen readers.

> Prefer native HTML validation (`required`, `type="email"`, `minlength`, etc.) whenever possible. ARIA should supplement native semantics, not replace them.

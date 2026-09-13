# What is the `<form>` element and how does it submit data?

The **`<form>` element** is used to collect user input and submit that data.

Important attributes include:

- `action` — URL where the form data is sent.
- `method` — HTTP method, usually `GET` or `POST`.
- `name` — identifies the form.
- `enctype` — controls how form data is encoded, especially important for file uploads.

Example:

```html
<!-- Submit the form data to /login using POST -->
<form action="/login" method="POST">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Login</button>
</form>
```

The important part is the **`name` attribute**.

Only successful form controls with a `name` are included in the submitted form data.

For example:

```text
email=user@example.com
password=secret123
```

When the submit button is clicked, the browser:

1. Validates the form.
2. Collects successful form controls.
3. Encodes the data.
4. Sends an HTTP request to the `action` URL.

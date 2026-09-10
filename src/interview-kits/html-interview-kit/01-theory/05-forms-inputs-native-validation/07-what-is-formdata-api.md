# What is the FormData API?

The **FormData API** provides a way to construct a set of form key-value pairs that can be sent using JavaScript.

It is especially useful with:

* `fetch()`
* AJAX requests
* File uploads
* JavaScript-controlled forms

Example:

```javascript
// Collect the values from a form and send them using fetch.
const form = document.querySelector("#login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const response = await fetch("/login", {
    method: "POST",
    body: formData
  });

  console.log(await response.json());
});
```

HTML:

```html
<!-- Give the form an id so JavaScript can create FormData from it -->
<form id="login-form">
  <input name="email" type="email" required />
  <input name="password" type="password" required />

  <button type="submit">Login</button>
</form>
```

You can also create `FormData` manually:

```javascript
// Create FormData manually and add key-value pairs.
const formData = new FormData();

formData.append("username", "ravi");
formData.append("role", "developer");

console.log(formData.get("username")); // ravi
```

### File upload

`FormData` is particularly useful for uploading files:

```javascript
// Send a selected file to the server using multipart/form-data.
const fileInput = document.querySelector("#profile");

const formData = new FormData();
formData.append("profile", fileInput.files[0]);

await fetch("/upload", {
  method: "POST",
  body: formData
});
```

When using `FormData` with `fetch()`, **don't manually set `Content-Type: multipart/form-data`**. The browser automatically sets the correct content type and boundary.
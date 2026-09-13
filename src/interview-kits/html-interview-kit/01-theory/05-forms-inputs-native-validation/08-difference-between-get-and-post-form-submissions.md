# Difference between GET and POST form submissions

`GET` and `POST` are HTTP methods that can be used for form submission.

## GET

With `GET`, form data is appended to the **URL as query parameters**.

```html
<!-- Submit search parameters using GET -->
<form action="/search" method="GET">
  <input name="query" type="search" />

  <button type="submit">Search</button>
</form>
```

If the user enters:

```text
React
```

The request will conceptually look like:

```text
/search?query=React
```

### GET characteristics

- Data appears in the URL.
- Can be bookmarked.
- Can be cached depending on the request/cache configuration.
- Useful for retrieving/searching/filtering data.
- Should not be used for sensitive data in the URL.
- GET requests should be **safe and idempotent** in their intended semantics.

---

## POST

With `POST`, form data is normally sent in the **HTTP request body**.

```html
<!-- Submit account information using POST -->
<form action="/register" method="POST">
  <input name="username" type="text" required />
  <input name="email" type="email" required />

  <button type="submit">Register</button>
</form>
```

Conceptually:

```text
POST /register

Request Body:
username=ravi&email=ravi@example.com
```

### POST characteristics

- Data is sent in the request body.
- Data doesn't appear in the URL by default.
- Commonly used for creating or changing server-side data.
- Suitable for larger payloads than GET query parameters.
- Can be used for sensitive data **only with HTTPS and proper server-side security**.

### Important interview point ⭐

**POST does not automatically make data secure.**

For example, passwords submitted using POST are still exposed if you use plain HTTP.

Use:

```text
HTTPS + proper authentication + server-side validation
```

---

# GET vs POST — Quick Comparison

| Feature                | GET                            | POST                                         |
| ---------------------- | ------------------------------ | -------------------------------------------- |
| Data location          | URL/query string               | Request body                                 |
| Visible in URL         | ✅ Yes                         | ❌ Normally no                               |
| Bookmarkable           | ✅ Yes                         | ❌ Generally no                              |
| Typical purpose        | Retrieve/search/filter         | Create/change/submit                         |
| Suitable for passwords | ❌ No                          | ✅ With HTTPS                                |
| Data size              | Limited by URL constraints     | Generally much larger                        |
| Browser caching        | More naturally cacheable       | Not normally cached as a normal GET response |
| Idempotency            | Intended to be safe/idempotent | Not necessarily idempotent                   |

### Easy interview summary ⭐

```text
<form>
    ↓
Collect named controls
    ↓
Validate
    ↓
Encode
    ↓
GET  → URL query parameters
POST → Request body
```

And remember:

> **GET is primarily for retrieving resources; POST is commonly used when submitting data that causes a server-side action or state change.**

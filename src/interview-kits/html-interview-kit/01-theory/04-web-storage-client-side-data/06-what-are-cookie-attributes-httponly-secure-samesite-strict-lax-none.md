# What are Cookie attributes?

Cookie attributes control **how and when cookies are sent and accessed**.

The important security attributes are `HttpOnly`, `Secure`, and `SameSite`.

---

## `HttpOnly`

`HttpOnly` prevents JavaScript from accessing the cookie through APIs such as `document.cookie`.

```http id="0gjp0k"
Set-Cookie: sessionId=abc123; HttpOnly
```

This means:

```javascript
// HttpOnly cookies cannot be read through document.cookie.
console.log(document.cookie);
```

The browser can still send the cookie with appropriate HTTP requests.

### Why is it useful?

It helps protect sensitive cookies such as session identifiers from being directly stolen by JavaScript in an XSS attack.

---

## `Secure`

`Secure` tells the browser to send the cookie only over **HTTPS** connections, with the usual localhost development exceptions handled by browsers.

```http id="t3g3zq"
Set-Cookie: sessionId=abc123; Secure
```

For production authentication cookies, `Secure` should generally be used.

---

# `SameSite`

`SameSite` controls when a cookie is sent in **cross-site requests**.

There are three important values:

```text
Strict
Lax
None
```

## `SameSite=Strict`

The cookie is sent only in same-site contexts.

```http id="w3a8c4"
Set-Cookie: sessionId=abc123; SameSite=Strict
```

This provides strong protection against many cross-site request scenarios, but can interfere with flows where users arrive from another site.

---

## `SameSite=Lax`

The browser allows the cookie in same-site requests and in certain **top-level cross-site navigations**, while restricting it in many other cross-site contexts.

```http id="h7c1u4"
Set-Cookie: sessionId=abc123; SameSite=Lax
```

`Lax` is commonly a good default for many session cookies.

---

## `SameSite=None`

The cookie can be sent in cross-site contexts.

```http id="c5k0v9"
Set-Cookie: sessionId=abc123; SameSite=None; Secure
```

When using `SameSite=None`, browsers require the cookie to also have:

```text
Secure
```

This is commonly needed for legitimate cross-site scenarios, such as certain embedded or third-party integrations.

### Quick comparison

| Attribute         | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `HttpOnly`        | Prevent JavaScript from reading the cookie                    |
| `Secure`          | Send cookie only over secure HTTPS connections                |
| `SameSite=Strict` | Strongest same-site restriction                               |
| `SameSite=Lax`    | Allows same-site plus certain top-level cross-site navigation |
| `SameSite=None`   | Allows cross-site cookie usage; requires `Secure`             |

A production session cookie might look like:

```http id="t5f2sk"
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax; Path=/
```

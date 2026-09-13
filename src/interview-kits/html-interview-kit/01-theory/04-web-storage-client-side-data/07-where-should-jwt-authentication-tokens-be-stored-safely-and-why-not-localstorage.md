# Where should JWT authentication tokens be stored safely?

For a browser-based application, a common safer pattern is:

> **Store the authentication/session credential in a `Secure`, `HttpOnly`, appropriately `SameSite` cookie rather than putting a long-lived JWT in `localStorage`.**

For example:

```http id="kq0y4d"
Set-Cookie: accessToken=eyJ...; HttpOnly; Secure; SameSite=Lax; Path=/
```

### Why not `localStorage`?

The main problem is **JavaScript accessibility**.

If an attacker successfully executes malicious JavaScript through an XSS vulnerability, that JavaScript can potentially do:

```javascript id="l3g0qu"
// An XSS payload could potentially read a token stored in localStorage.
const token = localStorage.getItem('accessToken');
```

An `HttpOnly` cookie cannot be read through `document.cookie`.

### But HttpOnly cookies don't "solve XSS"

This is an important interview point.

If an attacker can execute JavaScript in your application, they may still be able to **make authenticated requests from the victim's browser** because the browser automatically attaches applicable cookies.

So `HttpOnly` primarily helps prevent **token exfiltration through JavaScript**. It does not make XSS harmless.

You still need:

- Strong XSS prevention
- Output encoding
- Safe React/DOM practices
- Content Security Policy (CSP)
- Proper input validation
- Short-lived credentials where appropriate
- Appropriate `SameSite` configuration

### What about CSRF?

Cookie-based authentication introduces an important consideration: **CSRF**.

Because browsers automatically send cookies, applications should use appropriate CSRF defenses where needed, such as:

- `SameSite` cookies
- CSRF tokens
- Origin/Referer validation
- Appropriate request design

### Best practical pattern

For many browser applications:

```text
User logs in
    ↓
Server authenticates user
    ↓
Server sets Secure + HttpOnly + SameSite cookie
    ↓
Browser stores cookie
    ↓
Browser automatically sends cookie with matching requests
    ↓
Server validates session/token
```

For highly sensitive applications, a **server-side session stored in an HttpOnly cookie** is often preferable to putting a long-lived JWT in browser storage.

## Interview Cheat Sheet ⭐

| Question              | Short answer                                                      |
| --------------------- | ----------------------------------------------------------------- |
| `localStorage`        | Persistent client-side key-value storage                          |
| `sessionStorage`      | Temporary storage associated with a page session                  |
| Cookies               | Small browser data that can automatically accompany HTTP requests |
| IndexedDB             | Client-side database for larger structured data                   |
| `HttpOnly`            | Prevents JavaScript from reading a cookie                         |
| `Secure`              | Restricts cookie transmission to secure connections               |
| `SameSite=Strict`     | Strong same-site restriction                                      |
| `SameSite=Lax`        | Same-site + certain top-level cross-site navigation               |
| `SameSite=None`       | Allows cross-site use; requires `Secure`                          |
| JWT in `localStorage` | Vulnerable to token theft if XSS executes                         |
| Safer browser pattern | `HttpOnly` + `Secure` + appropriate `SameSite` cookie             |

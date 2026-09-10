# What are Resource Hints?

**Resource hints** are HTML mechanisms that tell the browser about resources or connections that are likely to be needed.

They can improve loading performance by allowing the browser to prepare resources **earlier**.

The important ones are:

* `preload`
* `prefetch`
* `preconnect`
* `dns-prefetch`

---

## `preload`

`preload` tells the browser:

> **"This resource will be needed very soon. Start loading it early."**

Example:

```html id="y0q8kt"
<!-- Preload a font that is needed early during page rendering -->
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Good candidates include:

* Critical fonts
* Hero images
* Important CSS
* Critical scripts

### Important

Use `preload` carefully. If you preload too many resources, you can compete for bandwidth and make performance worse.

---

## `prefetch`

`prefetch` tells the browser:

> **"This resource might be needed later."**

Example:

```html id="k8m5fw"
<!-- Prefetch a page that the user is likely to visit next -->
<link rel="prefetch" href="/checkout.html" />
```

Good for resources likely to be needed on a **future navigation**.

Example:

```text
User is on:
    /products

Likely next page:
    /checkout

        ↓

Prefetch /checkout
```

### Key difference

**Preload → needed soon**

**Prefetch → might be needed later**

---

## `preconnect`

`preconnect` tells the browser:

> **"We will probably need this origin, so establish the connection early."**

Example:

```html id="v3j1xk"
<!-- Establish the connection early to an external resource origin -->
<link rel="preconnect" href="https://fonts.example.com" />
```

It can prepare parts of the connection process, such as:

* DNS resolution
* TCP connection
* TLS negotiation for HTTPS

This can reduce connection setup time when the resource is requested later.

---

## `dns-prefetch`

`dns-prefetch` tells the browser:

> **"Resolve this domain's DNS early."**

Example:

```html id="8w1v6m"
<!-- Resolve the external domain before the resource is requested -->
<link rel="dns-prefetch" href="//cdn.example.com" />
```

It performs **DNS resolution**, but does not establish the complete connection like `preconnect`.

---

# Resource Hints Cheat Sheet ⭐

| Hint           | Purpose                        | When                              |
| -------------- | ------------------------------ | --------------------------------- |
| `preload`      | Load a resource early          | Needed very soon                  |
| `prefetch`     | Fetch a resource speculatively | Likely needed later               |
| `preconnect`   | Establish connection early     | External origin will be used soon |
| `dns-prefetch` | Resolve DNS early              | External domain may be used       |

### Simple mental model

```text
preload
  ↓
"I need this NOW."

prefetch
  ↓
"I might need this LATER."

preconnect
  ↓
"I'll need this server SOON."

dns-prefetch
  ↓
"At least resolve this domain early."
```

**Interview tip:** The most important distinction to remember is **`async` vs `defer`**: `async` prioritizes *early independent execution*, while `defer` prioritizes *preserving script order and waiting for HTML parsing to finish*.

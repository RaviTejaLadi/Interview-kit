# 🌐 HTML Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. HTML5 & Semantic Elements ⭐⭐⭐⭐⭐

### Must Know

1. What is HTML5 and what did it introduce?
2. What is Semantic HTML?
3. Why is Semantic HTML important for SEO and Accessibility?
4. Semantic tags vs `<div>` and `<span>`.
5. What are the key semantic landmark tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)?
6. `<article>` vs `<section>`: When to use which?
7. What is the `<!DOCTYPE html>` declaration and what happens if omitted (Quirks Mode)?
8. What are inline, block, and inline-block elements in HTML?

---

## 2. Accessibility (a11y) & ARIA ⭐⭐⭐⭐⭐

### Must Know

1. What is web accessibility (a11y)?
2. What is the Accessibility Tree?
3. What is ARIA (Accessible Rich Internet Applications)?
4. What is the First Rule of ARIA ("No ARIA is better than bad ARIA")?
5. What are ARIA roles, states, and properties?
6. When do you use `aria-label`, `aria-labelledby`, and `aria-describedby`?
7. What are ARIA live regions (`aria-live="polite"` vs `"assertive"`)?
8. How does keyboard navigation work natively in HTML (`tabindex="0"` vs `"-1"`)?
9. Why is `<div onClick="...">` an accessibility anti-pattern?
10. What is the importance of the `alt` attribute on `<img>` tags?

---

## 3. Critical Rendering Path & Script Loading ⭐⭐⭐⭐⭐

### Must Know

1. How does the browser parse HTML into the DOM tree?
2. What blocks HTML parsing?
3. What is the difference between normal `<script>`, `<script async>`, and `<script defer>`?
4. How does `<script type="module">` behave regarding loading and execution?
5. When should you use `async` vs `defer`?
6. What are `DOMContentLoaded` and `load` events?
7. What are Resource Hints: `preload`, `prefetch`, `preconnect`, and `dns-prefetch`?

---

## 4. Web Storage & Client-Side Data ⭐⭐⭐⭐⭐

### Must Know

1. What is `localStorage`?
2. What is `sessionStorage`?
3. What are Cookies (`document.cookie`)?
4. What is `IndexedDB`?
5. Differences between `localStorage`, `sessionStorage`, Cookies, and `IndexedDB` (capacity, expiration, server-sharing).
6. What are Cookie attributes: `HttpOnly`, `Secure`, `SameSite` (Strict, Lax, None)?
7. Where should JWT authentication tokens be stored safely (and why not `localStorage`)?

---

## 5. Forms, Inputs & Native Validation ⭐⭐⭐⭐⭐

### Must Know

1. What is the `<form>` element and how does it submit data?
2. What are the common `input` types in HTML5 (`email`, `number`, `tel`, `date`, `file`, etc.)?
3. How does native HTML5 form validation work (`required`, `pattern`, `min`, `max`, `step`)?
4. How do you link `<label>` and `<input>` properly (explicit `for`/`id` vs implicit nesting)?
5. What is `<fieldset>` and `<legend>`?
6. What is the `<datalist>` element?
7. What is FormData API?
8. Difference between `GET` and `POST` form submissions.

---

## 6. Media & Responsive Images ⭐⭐⭐⭐⭐

### Must Know

1. How does the `<img>` tag work with `srcset` and `sizes`?
2. What is the `<picture>` element and when is it preferred over `<img>` with `srcset` (Art Direction vs Resolution Switching)?
3. What is native image lazy loading (`loading="lazy"`)?
4. Why should you always specify `width` and `height` attributes on `<img>` (preventing Cumulative Layout Shift - CLS)?
5. How do `<audio>` and `<video>` tags work?
6. Canvas vs SVG: Key architectural differences.

---

## 7. Meta Tags, Head & Modern SEO ⭐⭐⭐⭐

### Must Know

1. What is the purpose of `<head>`?
2. What is the responsive viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`)?
3. What is `<link rel="canonical">` and why is it vital for SEO?
4. What are Open Graph (`og:*`) tags?
5. What are Twitter Card meta tags?
6. What is a favicon and how do you configure it?

---

## 8. Modern HTML5 APIs ⭐⭐⭐⭐

### Must Know

1. What is the native `<dialog>` element and `showModal()` API?
2. What is the Intersection Observer API?
3. What is the Geolocation API?
4. What are Web Workers and what can they do?
5. What is the Drag and Drop API?
6. What are Web Components (`<template>`, `<slot>`, Shadow DOM, Custom Elements)?

---

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

---

## 9. Semantic & Accessible Markup Coding ⭐⭐⭐⭐⭐

### Must Build / Write

1. Write a complete, semantic HTML5 document skeleton with accessibility landmarks.
2. Build an accessible registration form with linked labels, helper text, error announcement regions, and submit button.
3. Markup a semantic blog article with author, publication date, headings hierarchy, and related tags.
4. Markup an accessible navigation bar with submenus (`aria-haspopup`, `aria-expanded`).
5. Build an accessible modal dialog using native `<dialog>` and `showModal()`.

---

## 10. Performance & Media Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Write a responsive `<picture>` element serving modern AVIF, WebP, and JPEG fallback with lazy loading.
2. Implement resource hints (`preconnect`, `preload`) for Google Fonts and critical hero images.
3. Write script tags demonstrating correct usage of `defer`, `async`, and `type="module"`.
4. Build a file upload input supporting drag-and-drop file selection with native HTML/JS.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 11. Script Loading Matrix ⭐⭐⭐⭐⭐

```text
HTML Parsing:    ====================[BLOCKED]=============>
Normal Script:                 [Fetch][Execute]

HTML Parsing:    ==========================================>
Script async:        [Fetch]   [Execute - BLOCKS PARSING]

HTML Parsing:    ==========================================>
Script defer:        [Fetch................] [Execute after DOM ready]
```

---

# 🏆 TOP 20 — If You Have Very Little Time

### 🔥 Theory

1. Semantic HTML & SEO/a11y advantages
2. `<article>` vs `<section>` vs `<div>`
3. `async` vs `defer` in script loading
4. Critical rendering path (DOM + CSSOM construction)
5. `localStorage` vs `sessionStorage` vs Cookies vs `IndexedDB`
6. Secure cookie flags: `HttpOnly`, `Secure`, `SameSite`
7. Form labels association (`for`/`id`)
8. Native lazy loading (`loading="lazy"`)
9. Responsive image art direction with `<picture>`
10. Viewport meta tag mechanics
11. First rule of ARIA
12. Native `<dialog>` element and focus trapping
13. `<!DOCTYPE html>` & Quirks Mode
14. Canonical URLs
15. Canvas vs SVG

### 💻 Coding

16. Build an accessible form with validation and ARIA live regions
17. Write a `<picture>` element with AVIF/WebP formats and `sizes`
18. Implement `<dialog>` modal with open/close listeners
19. Markup an accessible multi-level navigation menu
20. Configure `<head>` meta tags for responsive layout, SEO, and Open Graph

---

# 🎯 WHAT YOU DO NOT NEED TO PRIORITIZE

- ❌ Obsolete HTML4 tags (`<font>`, `<center>`, `<frame>`, `<frameset>`)
- ❌ Complex native Drag-and-Drop edge cases (most projects use libraries)
- ❌ Native WebSQL (deprecated and removed)
- ❌ Obscure MathML or SVG filter syntax
- ❌ HTML Microdata syntax (JSON-LD is the modern standard for structured data)

---

# 📌 FINAL PREPARATION ORDER

```text
1. Document Structure & Doctype
      ↓
2. Semantic Landmarks (main, nav, article)
      ↓
3. Forms & Native Validation
      ↓
4. Accessibility (ARIA, roles, labels)
      ↓
5. Script Loading (async, defer, modules)
      ↓
6. Media & Responsive Images (picture, srcset)
      ↓
7. Client-Side Storage (Cookies vs Storage)
      ↓
8. Native APIs (dialog, IntersectionObserver)
```

---

# ✅ FINAL CHECKLIST

## Theory

- Semantic tags & landmarks
- Doctype & Quirks Mode
- ARIA rules & attributes
- `async` vs `defer`
- Critical rendering path
- Storage: local vs session vs cookie vs IndexedDB
- Forms & `<label>` binding
- `<picture>` vs `<img>`
- Viewport & SEO meta tags
- Native `<dialog>` API

## Coding

- Semantic form with a11y
- Responsive `<picture>`
- Native `<dialog>` modal
- Responsive `<head>` metadata

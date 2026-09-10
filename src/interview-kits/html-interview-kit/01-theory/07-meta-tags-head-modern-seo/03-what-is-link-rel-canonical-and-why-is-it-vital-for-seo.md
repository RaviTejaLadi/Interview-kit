# What is `<link rel="canonical">` and why is it important for SEO?

A **canonical link** tells search engines which URL should be treated as the **preferred or canonical version of a page** when multiple URLs contain the same or very similar content.

Example:

```html id="d0xjlb"
<!-- Tell search engines which URL is the preferred version of this page -->
<link
  rel="canonical"
  href="https://example.com/products/react"
/>
```

Imagine the same page can be accessed through:

```text
https://example.com/products/react
https://example.com/products/react?source=google
https://example.com/products/react?ref=homepage
```

These URLs may contain the same content.

The canonical URL tells search engines:

```text id="w4e8uj"
Preferred URL
      ↓
/products/react
```

### Why is it important?

It helps search engines:

* Consolidate duplicate/similar URLs
* Understand your preferred URL
* Consolidate certain ranking signals
* Avoid unnecessary duplicate indexing

### Important

A canonical tag is a **hint**, not an absolute command. Search engines can choose a different canonical URL if their signals indicate another URL is more appropriate.

### Common interview answer

> `rel="canonical"` specifies the preferred URL for duplicate or near-duplicate content and helps search engines consolidate indexing and ranking signals.

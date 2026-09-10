# What is the purpose of `<head>`?

The `<head>` element contains **metadata and resources about the HTML document**.

Its contents are generally not displayed as normal page content.

Common elements inside `<head>` include:

* `<title>`
* `<meta>`
* `<link>`
* `<style>`
* `<script>`
* `<base>`

Example:

```html id="0j7f7s"
<!-- Define document metadata and resources inside the head -->
<head>
  <meta charset="UTF-8" />

  <meta
    name="description"
    content="Learn HTML fundamentals"
  />

  <title>HTML Tutorial</title>

  <link rel="stylesheet" href="/styles.css" />
</head>
```

### Important elements

**`<title>`**

Defines the page title shown in the browser tab and is also important for SEO.

**`<meta>`**

Provides metadata such as:

* Character encoding
* Viewport configuration
* Description
* Robots instructions

**`<link>`**

Defines relationships between the document and external resources.

Examples:

* Stylesheets
* Favicons
* Canonical URLs
* Preload resources

### Simple definition ⭐

> **`<head>` contains metadata, page information, and resource references required by the browser and other services.**
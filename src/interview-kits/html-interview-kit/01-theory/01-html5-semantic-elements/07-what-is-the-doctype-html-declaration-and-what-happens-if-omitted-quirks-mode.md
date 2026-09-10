# What is `<!DOCTYPE html>` and what happens if omitted?

`<!DOCTYPE html>` is a **document type declaration** that tells the browser to use **standards mode** for rendering the HTML document.

In HTML5, it is simply:

```html
<!-- Tell the browser to use HTML standards mode -->
<!DOCTYPE html>
```

A typical HTML document starts like this:

```html
<!-- Basic HTML5 document structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

### What happens if it is omitted?

Older browsers may enter **Quirks Mode**.

Quirks Mode attempts to reproduce old browser behavior for legacy websites. This can cause differences in things such as:

* CSS box model behavior
* Element sizing
* Layout calculations
* Browser rendering

So, always include:

```html
<!DOCTYPE html>
```

### Important distinction

`<!DOCTYPE html>` is **not an HTML element**. It is a **declaration**.
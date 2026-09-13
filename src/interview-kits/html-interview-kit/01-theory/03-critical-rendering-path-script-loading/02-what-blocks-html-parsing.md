# What blocks HTML parsing?

Anything that requires the parser to **pause before it can safely continue** can block HTML parsing.

The most important example is a **classic synchronous `<script>`**.

```html id="p3y3h8"
<!-- A classic script can pause HTML parsing while it is fetched and executed -->
<script src="/app.js"></script>
```

When the parser reaches this script:

```text
Parse HTML
    ↓
<script>
    ↓
Pause HTML parsing
    ↓
Download script
    ↓
Execute JavaScript
    ↓
Resume HTML parsing
```

Why?

JavaScript can modify the DOM:

```javascript id="4eh7w1"
// JavaScript can change the document while it is being parsed.
document.body.append('Hello');
```

Therefore, the browser must account for possible DOM changes before continuing.

### Other considerations

CSS does not normally stop the HTML parser itself, but stylesheets can affect when scripts execute and when rendering can proceed.

Also, if a script accesses a stylesheet-dependent API or otherwise interacts with document state, resource loading can create additional dependencies.

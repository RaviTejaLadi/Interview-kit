# Why does the cascade order in generated CSS determine the winner rather than the class string order?

The browser doesn't care about the order of classes inside the HTML attribute.

For example:

```html id="3r7h6q"
<!-- HTML class order does not determine the CSS winner -->
<div class="p-4 p-2"></div>
```

The browser ultimately sees generated CSS similar to:

```css id="0xyq73"
/* Simplified example of generated Tailwind CSS */
.p-2 {
  padding: 0.5rem;
}

.p-4 {
  padding: 1rem;
}
```

Because both selectors have the same specificity:

```text
.p-2  → specificity: 0,0,1
.p-4  → specificity: 0,0,1
```

the later rule wins.

Therefore:

```text
.p-4
```

wins in this simplified example.

### Important point

The browser doesn't interpret:

```text
class="p-2 p-4"
```

as:

> "Apply `p-2`, then apply `p-4`."

It interprets it as:

> "This element matches both `.p-2` and `.p-4`."

Then the CSS cascade decides which declaration wins.

# What is the Cascade in CSS?

### Definition

The **CSS Cascade** is the process the browser uses to decide **which CSS declaration should be applied when multiple rules target the same element/property**.

For example:

```css
/* Set the text color to blue */
p {
  color: blue;
}

/* Set the text color to red */
p {
  color: red;
}
```

Both rules have the same specificity, so the **later rule wins**.

The result is:

```text
red
```

### Main factors in the cascade

A simplified order to remember is:

1. **Origin and importance**
2. **Specificity**
3. **Scoping proximity**
4. **Source order**

For everyday CSS debugging, think:

> **Important/origin → specificity → which rule comes later**

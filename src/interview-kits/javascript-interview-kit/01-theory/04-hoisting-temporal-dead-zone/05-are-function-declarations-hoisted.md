# Are function declarations hoisted?

**Yes. Function declarations are hoisted, including their function body.**

This means you can call a function before its declaration.

```javascript
// Function declarations are fully hoisted.
greet();

function greet() {
  console.log('Hello');
}
```

Output:

```text
Hello
```

Conceptually:

```javascript
// Conceptual model — the function is available before execution reaches its declaration.
function greet() {
  console.log('Hello');
}

greet();
```

This is why function declarations can be called before they appear in the source code.

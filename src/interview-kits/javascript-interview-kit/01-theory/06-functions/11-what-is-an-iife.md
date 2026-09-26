# What is an IIFE?

**IIFE** stands for **Immediately Invoked Function Expression**.

It is a function expression that is created and executed immediately.

```javascript
// The function is created and immediately invoked.
(function () {
  console.log('Executed immediately');
})();
```

Arrow functions can also be used:

```javascript
// An arrow function can also be immediately invoked.
(() => {
  console.log('Hello');
})();
```

### Why were IIFEs commonly used?

Before ES modules and block-scoped `let`/`const`, IIFEs were commonly used to create a private scope and avoid polluting the global scope.

```javascript
// The IIFE keeps secretValue private to its own scope.
(function () {
  const secretValue = 42;

  console.log(secretValue);
})();

// console.log(secretValue); // ❌ ReferenceError
```

Today, **ES modules and block scope** have reduced the need for IIFEs.

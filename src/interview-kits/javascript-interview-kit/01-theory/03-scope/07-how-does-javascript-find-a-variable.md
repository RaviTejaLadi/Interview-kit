# How does JavaScript find a variable?

When JavaScript encounters a variable such as:

```javascript
console.log(name);
```

the engine performs a lexical scope lookup.

The basic process is:

```text
Current Scope
     ↓
Outer Scope
     ↓
Next Outer Scope
     ↓
Global Scope
     ↓
Not found → ReferenceError
```

Example:

```javascript
// JavaScript searches from the current scope outward.
const name = 'Global';

function outer() {
  const name = 'Outer';

  function inner() {
    const name = 'Inner';

    console.log(name);
  }

  inner();
}

outer(); // "Inner"
```

JavaScript finds `name` immediately inside `inner()`, so it stops searching.

### Another example

```javascript
// The lookup continues to the outer function when needed.
const name = 'Global';

function outer() {
  const message = 'Hello';

  function inner() {
    console.log(message);
  }

  inner();
}

outer(); // "Hello"
```

`message` isn't inside `inner()`, so JavaScript looks at `outer()` and finds it there.

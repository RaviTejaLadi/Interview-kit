# What is lexical scope?

**Lexical scope** means the scope of a variable is determined by **where the code is written**, not where the function is called.

JavaScript looks at the physical/nested structure of the source code to determine which variables are accessible.

```javascript
// The inner function can access variables from its lexical parent.
const name = 'Ravi';

function outer() {
  const message = 'Hello';

  function inner() {
    console.log(name); // Ravi
    console.log(message); // Hello
  }

  inner();
}

outer();
```

`inner()` can access:

1. Its own variables.
2. Variables from `outer()`.
3. Variables from the global scope.

### Important

Moving where a function is **called** does not change its lexical scope.

```javascript
// Lexical scope is determined where the function is defined.
const name = 'Ravi';

function createGreeting() {
  const message = 'Hello';

  return function greet() {
    console.log(message);
  };
}

const greet = createGreeting();

greet(); // Hello
```

This behavior is also the foundation of **closures**.

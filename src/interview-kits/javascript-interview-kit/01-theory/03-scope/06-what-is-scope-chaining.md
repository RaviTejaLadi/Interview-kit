# What is scope chaining?

**Scope chaining** is the mechanism JavaScript uses to search for a variable through nested lexical scopes.

If JavaScript cannot find a variable in the current scope, it moves to the **outer scope**, then continues outward until it reaches the global scope.

```javascript
// JavaScript searches from inner scope toward outer scopes.
const globalValue = 'Global';

function outer() {
  const outerValue = 'Outer';

  function inner() {
    const innerValue = 'Inner';

    console.log(innerValue); // Found in inner
    console.log(outerValue); // Found in outer
    console.log(globalValue); // Found in global
  }

  inner();
}

outer();
```

The scope chain looks like:

```text
inner()
   ↓
outer()
   ↓
Global scope
```

If JavaScript cannot find the variable anywhere:

```javascript
// An unknown identifier causes a ReferenceError.
function test() {
  console.log(username);
}

test(); // ReferenceError: username is not defined
```

# What is a pure function?

A **pure function** is a function that:

1. Always returns the same output for the same input.
2. Does not cause side effects.

Example:

```javascript
// This is pure because the result depends only on the inputs.
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5
```

### Impure function

```javascript
// This function is impure because it modifies external state.
let total = 0;

function addToTotal(value) {
  total += value;

  return total;
}
```

The result depends on external state.

### Another impure example

```javascript
// Reading the current time makes the function result unpredictable from input alone.
function getCurrentTime() {
  return Date.now();
}
```

### Pure function checklist

```text
Same input
    ↓
Same output
    ↓
No external state modification
    ↓
No side effects
```

Pure functions are particularly useful in React because predictable functions are easier to test and reason about.

# Create a counter using closure.

Problem: Create a counter that increments every time you call a function.

### Code example

```
// Create a counter using a closure.
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

### Explanation

1. `createCounter()` creates a local variable called `count`.
2. It returns an inner function.
3. The inner function accesses and updates `count`.
4. Even after `createCounter()` finishes executing, the inner function remembers `count`.

The variable `count` is not recreated every time you call `counter()`. It retains its previous value.

How the closure works

createCounter()

Creates count = 0

Returns inner function

counter()

Remembers and updates count

## 1 → 2 → 3

Key point: A closure allows a function to preserve state between function calls.

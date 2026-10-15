# Implement memoization.

Problem: Store the result of an expensive function call so that calling it again with the same input avoids recalculating the result.

Memoization is an optimization technique that uses previously computed results.

### Code example

```
// Cache function results based on their arguments.
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Returning cached result");
      return cache.get(key);
    }

    console.log("Calculating result");

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

function square(number) {
  return number * number;
}

const memoizedSquare = memoize(square);

console.log(memoizedSquare(5));
// Calculating result
// 25

console.log(memoizedSquare(5));
// Returning cached result
// 25

console.log(memoizedSquare(6));
// Calculating result
// 36
```

### Explanation

1. `memoize()` creates a `Map` to store results.
2. The returned function converts its arguments into a cache key.
3. If the key exists, it returns the stored result.
4. Otherwise, it executes the original function, stores the result, and returns it.

The cache persists because the returned function closes over the `cache` variable.

Memoization flow

Call function with input

Check the cache

Cache hit

Return stored result

Cache miss

Calculate and store

### When should you use memoization?

- Expensive mathematical calculations.
- Repeated computations with the same inputs.
- Recursive algorithms, such as Fibonacci.
- Pure functions whose outputs depend on their inputs.

Gotcha: `JSON.stringify(args)` is a simple demonstration, not a universal cache-key strategy. Different inputs can serialize ambiguously, circular references fail, and object identity is not preserved. Production implementations should choose an appropriate key strategy and consider cache size.

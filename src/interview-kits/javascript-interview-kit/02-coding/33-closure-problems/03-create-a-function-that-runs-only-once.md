# Create a function that runs only once.

Problem: Create a function that executes its logic only on the first call. Subsequent calls should not execute it again.

### Code example

```
// Execute the provided function only once.
function once(fn) {
  let hasRun = false;
  let result;

  return function (...args) {
    if (!hasRun) {
      result = fn.apply(this, args);
      hasRun = true;
    }

    return result;
  };
}

const initialize = once(() => {
  console.log("Initialization completed");
  return "Initialized";
});

console.log(initialize());
// Initialization completed
// Initialized

console.log(initialize()); // Initialized
console.log(initialize()); // Initialized
```

### Explanation

The `once()` function uses two closure variables:

- `hasRun`: Tracks whether the function has already executed.
- `result`: Stores the result of the first execution.

On the first call, `fn` executes and its result is stored. On later calls, the cached result is returned without executing `fn` again.

The `...args` syntax forwards any arguments, while `fn.apply(this, args)` preserves the calling context.

Where is this useful?

- One-time initialization.
- Registering a one-time setup operation.
- Preventing duplicate execution of certain actions.

Important: This implementation is intended for synchronous functions. For asynchronous initialization, you should also consider how to handle rejected promises and retries.

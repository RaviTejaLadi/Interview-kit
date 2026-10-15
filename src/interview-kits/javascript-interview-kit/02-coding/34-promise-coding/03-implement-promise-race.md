# Implement `Promise.race()`.

`Promise.race()` settles as soon as the first input promise settles. The first settlement can be either fulfillment or rejection.

### Implementation

// Implement Promise.race() using native Promise.

```
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

const fast = new Promise((resolve) =>
  setTimeout(() => resolve("Fast request"), 500)
);

const slow = new Promise((resolve) =>
  setTimeout(() => resolve("Slow request"), 1000)
);

myPromiseRace([fast, slow]).then(console.log);
```

Output:

```
Fast request
```

### Explanation

1. Both promises begin their work.
2. The first one to fulfill or reject settles the returned promise.
3. Later settlements do not change the result.

An empty iterable leaves the returned promise pending forever.

Use case: Racing requests against a timeout. Note that racing against a timeout does not cancel the original request; cancellation requires a mechanism such as `AbortController`.

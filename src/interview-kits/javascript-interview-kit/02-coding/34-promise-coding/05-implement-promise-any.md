# Implement `Promise.any()`.

`Promise.any()` fulfills as soon as the first input fulfills. It ignores earlier rejections unless every input rejects.

### Implementation

// Implement Promise.any() using native Promise.

```
function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises);
    const errors = [];
    let rejectedCount = 0;

    if (items.length === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    items.forEach((promise, index) => {
      Promise.resolve(promise).then(
        resolve,
        (error) => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === items.length) {
            reject(
              new AggregateError(
                errors,
                "All promises were rejected"
              )
            );
          }
        }
      );
    });
  });
}

myPromiseAny([
  Promise.reject("Error A"),
  Promise.resolve("Success B"),
  Promise.resolve("Success C"),
]).then(console.log);
```

Output:

```
Success B
```

### Explanation

- The first fulfillment determines the result.
- Rejections are recorded in input order.
- If all inputs reject, an `AggregateError` is thrown.
- An empty iterable rejects with an `AggregateError`.

### Understand the difference

| Method                 | When does it settle?                | If one input rejects                           |
| ---------------------- | ----------------------------------- | ---------------------------------------------- |
| `Promise.all()`        | All fulfill, or the first rejection | Rejects immediately                            |
| `Promise.race()`       | First settlement                    | Rejects if the first settlement is a rejection |
| `Promise.allSettled()` | Every input settles                 | Records the rejection                          |
| `Promise.any()`        | First fulfillment, or all reject    | Continues waiting for a fulfillment            |

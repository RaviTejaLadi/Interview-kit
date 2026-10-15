# Implement `Promise.all()`.

`Promise.all()` runs multiple asynchronous operations concurrently and fulfills when every input fulfills. If any input rejects, the returned promise rejects.

### Implementation

// Implement Promise.all() using native Promise.

```
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const items = Array.from(promises);
    const results = [];
    let completed = 0;

    if (items.length === 0) {
      resolve([]);
      return;
    }

    items.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === items.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

myPromiseAll([
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C"),
]).then(console.log);
```

Output:

```
["A", "B", "C"]
```

### Explanation

- `Array.from()` converts the input iterable into an array.
- `Promise.resolve()` handles both regular values and promises.
- `results[index]` preserves the original input order.
- `completed` tracks how many operations have fulfilled.
- `reject` rejects the aggregate promise if an input rejects.

Key point: Results maintain input order, not completion order.

For example, if the second request finishes first, its result still occupies index `1`.

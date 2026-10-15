# Implement `Promise.allSettled()`.

`Promise.allSettled()` waits until every input promise settles, regardless of whether it fulfills or rejects.

Unlike `Promise.all()`, one rejection does not cause the entire result to reject.

### Implementation

// Implement Promise.allSettled() using native Promise.

```
function myPromiseAllSettled(promises) {
  const items = Array.from(promises);

  return Promise.all(
    items.map((promise) =>
      Promise.resolve(promise).then(
        (value) => ({
          status: "fulfilled",
          value,
        }),
        (reason) => ({
          status: "rejected",
          reason,
        })
      )
    )
  );
}

myPromiseAllSettled([
  Promise.resolve("Success"),
  Promise.reject("Failed"),
]).then(console.log);
```

Output:

```
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Failed" }
]
```

### Explanation

Each input is converted into a promise that fulfills with an outcome object, even if the original input rejects.

The final `Promise.all()` waits for these outcome objects. Since the rejection handler converts each rejection into a fulfilled result, the aggregate operation can complete successfully.

Use case: Fetching multiple dashboard widgets when each widget should report its own success or failure.

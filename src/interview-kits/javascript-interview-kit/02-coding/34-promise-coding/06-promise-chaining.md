# Promise chaining.

Promise chaining lets you execute asynchronous operations in sequence by returning a value or another promise from `.then()`.

Think of it like passing a result from one step to the next.

### Example

// Chain asynchronous operations using then().

```
Promise.resolve(10)
  .then((value) => {
    console.log("Step 1:", value);
    return value * 2;
  })
  .then((value) => {
    console.log("Step 2:", value);
    return value + 5;
  })
  .then((value) => {
    console.log("Final result:", value);
  });
```

Output:

```
Step 1: 10
Step 2: 20
Final result: 25
```

### Chaining asynchronous operations

// Return a promise from each chain step.

```
function getUser() {
  return Promise.resolve({ id: 1, name: "Ravi" });
}

function getOrders(userId) {
  return Promise.resolve([
    { orderId: 101, userId },
    { orderId: 102, userId },
  ]);
}

getUser()
  .then((user) => {
    console.log("User:", user.name);
    return getOrders(user.id);
  })
  .then((orders) => {
    console.log("Orders:", orders);
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });
```

### Important rules

- Every `.then()` returns a new promise.
- Returning a regular value fulfills the next promise with that value.
- Returning a promise makes the next step wait for it.
- Throwing an error rejects the next promise.
- If you forget to return an asynchronous operation, the next step won't wait for it.

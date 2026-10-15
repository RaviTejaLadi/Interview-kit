# Promise error handling.

The primary ways to handle promise errors are `.catch()` and `.finally()`.

- `.catch()` handles a rejection.
- `.finally()` runs after settlement, whether fulfilled or rejected.
- A `try...catch` can handle promise failures when used with `async/await`.

### Using `.catch()`

// Handle a rejected promise with catch().

```
Promise.reject(new Error("API request failed"))
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Caught:", error.message);
  });
```

Output:

```
Caught: API request failed
```

### Error propagation in a chain

// Demonstrate error propagation and recovery.

```
Promise.resolve(10)
  .then((value) => {
    throw new Error("Something went wrong");
  })
  .then((value) => {
    console.log("This step is skipped");
  })
  .catch((error) => {
    console.error(error.message);
    return "Recovered";
  })
  .then((value) => {
    console.log(value);
  });
```

Output:

```
Something went wrong
Recovered
```

The error skips subsequent fulfillment handlers until a rejection handler handles it. Returning `"Recovered"` allows the chain to continue successfully.

### Using `async/await` with `try...catch`

// Handle promise failures with async/await.

```
async function fetchData() {
  try {
    const response = await Promise.reject(
      new Error("Network error")
    );

    console.log(response);
  } catch (error) {
    console.error("Failed:", error.message);
  } finally {
    console.log("Request completed");
  }
}

fetchData();
```

Output:

```
Failed: Network error
Request completed
```

Common mistake: A `.catch()` placed at the end of a chain will handle errors propagated through that chain, but it won't automatically catch errors from unrelated promises that you never return or await.

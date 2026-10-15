# Add a timeout to an async operation.

A timeout prevents your code from waiting indefinitely for an operation. With `fetch()`, `AbortController` can stop the underlying request when the timeout expires.

### Using `AbortController`

// Abort a fetch request when the timeout expires.

```
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort(
      new DOMException("Request timed out", "TimeoutError")
    );
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

fetchWithTimeout(
  "https://jsonplaceholder.typicode.com/users",
  5000
)
  .then(console.log)
  .catch((error) => {
    if (error.name === "TimeoutError") {
      console.error("The request timed out");
    } else if (error.name === "AbortError") {
      console.error("The request was aborted");
    } else {
      console.error("Request failed:", error.message);
    }
  });
```

### Explanation

1. Create an `AbortController`.
2. Pass its `signal` to `fetch()`.
3. Start a timer.
4. Call `controller.abort()` when the timeout expires.
5. Clear the timer after the operation settles.

The custom `TimeoutError` reason lets you distinguish this timeout from other aborts.

Note: This pattern is specific to operations that support `AbortSignal`. For arbitrary Promises that cannot be cancelled, a timeout may stop waiting for the result without stopping the underlying work.

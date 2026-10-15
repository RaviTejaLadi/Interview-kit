# Retry a failed request.

Sometimes an API fails temporarily because of network problems, rate limits, or server errors. Retrying can help recover from transient failures.

A retry function should limit the number of attempts and use a delay between attempts.

// Retry a failed operation with a delay.

```
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryRequest(
  requestFn,
  maxAttempts = 3,
  delayMs = 1000
) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }

      console.warn(
        `Attempt ${attempt} failed. Retrying...`
      );

      await delay(delayMs);
    }
  }
}

async function fetchUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

retryRequest(fetchUser, 3, 1000)
  .then(console.log)
  .catch((error) => {
    console.error("All attempts failed:", error.message);
  });
```

### How it works

- The request is attempted up to three times.
- If it succeeds, the result is returned immediately.
- If it fails, the function waits one second before retrying.
- After the final failed attempt, the error is thrown.

Here, `maxAttempts = 3` means three total attempts, not three retries after the initial attempt.

### Production considerations

A robust retry strategy should also consider:

- Retrying only transient failures, such as `429` or selected `5xx` responses.
- Exponential backoff, such as 1, 2, and 4 seconds.
- Respecting the server's `Retry-After` header.
- Avoiding automatic retries for non-idempotent operations such as payments or order creation unless you have appropriate idempotency protection.

This example retries every thrown error for simplicity. In production, you should classify errors before retrying.

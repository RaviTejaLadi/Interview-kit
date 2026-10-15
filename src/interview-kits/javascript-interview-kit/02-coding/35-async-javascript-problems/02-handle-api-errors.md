# Handle API errors.

API requests can fail for several reasons:

- Network connection problems.
- HTTP errors such as `404` and `500`.
- Invalid JSON responses.
- Unexpected errors in your application.

Use `try...catch...finally` to handle these cases.

// Handle network errors, HTTP errors, and cleanup.

```
async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();

    console.log("User:", user);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw error;
  } finally {
    console.log("Request completed");
  }
}

fetchUser().catch(() => {
  // Handle the propagated error at the call site.
});
```

### Explanation

- `try` contains the code that might fail.
- `catch` handles network errors, parsing errors, and errors thrown for unsuccessful HTTP statuses.
- `finally` executes whether the request succeeds or fails.
- `throw error` allows the caller to handle the failure instead of silently treating it as success.

A common mistake is to omit `response.ok`. A `404` response can still resolve the `fetch()` Promise, so checking the status is essential.

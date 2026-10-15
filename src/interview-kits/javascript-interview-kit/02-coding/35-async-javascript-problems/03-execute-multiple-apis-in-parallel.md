# Execute multiple APIs in parallel.

Use `Promise.all()` when multiple API requests are independent and can run at the same time.

For example, a dashboard might need users, posts, and comments.

// Fetch three API resources concurrently.

```
async function fetchDashboardData() {
  try {
    const [usersResponse, postsResponse, commentsResponse] =
      await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

    const responses = [
      usersResponse,
      postsResponse,
      commentsResponse,
    ];

    if (responses.some((response) => !response.ok)) {
      throw new Error("One or more API requests failed");
    }

    const [users, posts, comments] = await Promise.all(
      responses.map((response) => response.json())
    );

    return { users, posts, comments };
  } catch (error) {
    console.error("Dashboard error:", error.message);
    throw error;
  }
}

fetchDashboardData()
  .then(console.log)
  .catch(() => {});
```

### How it works

Start all three API requests

Users API

Posts API

Comments API

Wait for all requests and process the results

The requests overlap in time, so the total duration is approximately the duration of the slowest request rather than the sum of all request durations.

Important: `Promise.all()` rejects when an input promise rejects, but it does not automatically cancel the other requests. In this example, HTTP failures are explicitly checked after all three responses arrive.

If each request should succeed or fail independently, consider `Promise.allSettled()` instead.

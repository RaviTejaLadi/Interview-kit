# Execute APIs sequentially.

Use sequential execution when one request depends on the result of another.

For example:

1. Fetch a user.
2. Use the user's ID to fetch their posts.
3. Use a post ID to fetch its comments.

// Fetch dependent resources one after another.

```
async function fetchUserDetails() {
  try {
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await userResponse.json();

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );

    if (!postsResponse.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await postsResponse.json();

    const firstPost = posts[0];

    if (!firstPost) {
      return { user, posts, comments: [] };
    }

    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${firstPost.id}/comments`
    );

    if (!commentsResponse.ok) {
      throw new Error("Failed to fetch comments");
    }

    const comments = await commentsResponse.json();

    return { user, posts, comments };
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

fetchUserDetails()
  .then(console.log)
  .catch(() => {});
```

### Why use sequential execution?

Each `await` pauses the current function until the corresponding Promise settles. The next request starts only after the required data is available.

| Parallel                             | Sequential                  |
| ------------------------------------ | --------------------------- |
| Independent requests                 | Dependent requests          |
| `Promise.all()`                      | Multiple `await` statements |
| Usually faster for independent tasks | Preserves dependency order  |

Interview tip: Don't use sequential requests unnecessarily. If two APIs don't depend on each other, running them in parallel can reduce total waiting time.

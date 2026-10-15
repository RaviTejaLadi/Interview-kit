# Fetch data using `async/await`.

The `fetch()` API sends an HTTP request and returns a Promise. Using `await`, we can wait for the response and convert it into JSON.

// Fetch users from a public API using async/await.

```
async function fetchUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const users = await response.json();

  console.log(users);
}

fetchUsers();
```

### How it works

1. `async` makes the function return a Promise.
2. `await fetch()` waits for the HTTP response.
3. `await response.json()` parses the response body.
4. `console.log()` displays the parsed data.

Important: `fetch()` does not reject automatically for HTTP errors such as `404` or `500`. You must check `response.ok` to detect these failures.

// Fetch data and check the HTTP status.

```
async function fetchUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

fetchUsers()
  .then(console.log)
  .catch(console.error);
```

Use this pattern whenever you fetch data from an API.

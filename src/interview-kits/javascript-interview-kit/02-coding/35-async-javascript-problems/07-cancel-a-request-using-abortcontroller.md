# Cancel a request using `AbortController`.

`AbortController` allows you to cancel a `fetch()` request before it completes. It is especially useful in React when a component unmounts or a user changes search terms while a previous request is still running.

### Basic example

// Cancel a fetch request after starting it.

```
async function fetchUsers(signal) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    { signal }
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

const controller = new AbortController();

fetchUsers(controller.signal)
  .then(console.log)
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Request cancelled");
    } else {
      console.error("Request failed:", error.message);
    }
  });

// Cancel the request when needed.
controller.abort();
```

The request may be cancelled before a response arrives. If it has already completed, aborting cannot undo the completed operation.

### React example using `useEffect`

This is a common pattern when loading data for a component.

// Fetch data and cancel the request during cleanup.

```
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError(error.message);
      }
    }

    loadUsers();

    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default Users;
```

### Why is cleanup important?

- It cancels requests when the component unmounts.
- It avoids updating component state after an obsolete request has been cancelled.
- It works with React's effect cleanup lifecycle, including development checks under Strict Mode.

For search interfaces, create a new controller for each request and abort the previous one when the search term changes.

| Question           | Main concept              | Common use case        |
| ------------------ | ------------------------- | ---------------------- |
| 1. Fetch data      | `async/await`, `fetch()`  | Load API data          |
| 2. Handle errors   | `try...catch...finally`   | Handle failed requests |
| 3. Parallel APIs   | `Promise.all()`           | Dashboard data         |
| 4. Sequential APIs | `await` in order          | Dependent API calls    |
| 5. Retry requests  | Retry loop and delay      | Temporary failures     |
| 6. Add a timeout   | Timer + `AbortController` | Prevent long waits     |
| 7. Cancel requests | `AbortController.signal`  | React cleanup, search  |

The key takeaway: Use `async/await` to organize asynchronous logic, `Promise.all()` for independent requests, sequential `await` for dependent requests, and `AbortController` for cancellation and request timeouts.

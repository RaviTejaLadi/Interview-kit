## Final revision cheat sheet

| Question                  | Key concept                             |
| ------------------------- | --------------------------------------- |
| 1. Promise from scratch   | States, `resolve`, `reject`             |
| 2. `Promise.all()`        | All fulfill or one rejects              |
| 3. `Promise.race()`       | First settlement wins                   |
| 4. `Promise.allSettled()` | Wait for every settlement               |
| 5. `Promise.any()`        | First fulfillment wins                  |
| 6. Promise chaining       | Pass results using `.then()`            |
| 7. Error handling         | `.catch()`, `.finally()`, `try...catch` |
| 8. Sequential execution   | `await` one task at a time              |
| 9. Parallel execution     | Start independent tasks together        |

Recommended practice order: First master Promise chaining and error handling. Then implement `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, and `Promise.any()`. Finally, practice sequential and parallel execution with API requests, because these concepts are common in React applications and JavaScript interviews.

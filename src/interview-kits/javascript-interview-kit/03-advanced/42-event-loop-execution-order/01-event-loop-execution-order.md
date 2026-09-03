# Event Loop Execution Order

You should be able to reason about:

```text
Synchronous code
      ↓
Call Stack
      ↓
Microtasks
      ↓
Next task / Macrotask
      ↓
Microtasks
      ↓
Next task
```

Especially understand:

- `Promise.then()`
- `queueMicrotask()`
- `setTimeout()`
- `setInterval()`
- `async/await`

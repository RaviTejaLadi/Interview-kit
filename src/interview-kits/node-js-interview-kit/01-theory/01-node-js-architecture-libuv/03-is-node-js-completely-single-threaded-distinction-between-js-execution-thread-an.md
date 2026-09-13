# Is Node.js completely single-threaded? (Distinction between JS execution thread and Libuv worker thread pool).

### Short answer: **No.**

This is one of the most common Node.js interview questions.

Node.js executes **JavaScript code primarily on a single main thread**, but Node.js itself uses multiple threads internally.

The important distinction is:

```text
                 Node.js
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
     Main Thread          Libuv Thread Pool
          │                   │
       V8 / JS          Background operations
          │
     Event Loop
```

### Main JavaScript thread

Your JavaScript normally runs on the main thread.

For example:

```javascript
// This JavaScript runs on the main Node.js thread.
console.log("Hello");

for (let i = 0; i < 1_000_000_000; i++) {
  // CPU-heavy JavaScript blocks the main thread.
}

console.log("Done");
```

While this loop is running, the event loop cannot process other JavaScript callbacks.

That's why CPU-heavy JavaScript can make a Node.js server unresponsive.

### Libuv threads

Libuv also maintains a **worker thread pool**.

Some operations can be delegated to these worker threads.

Therefore:

> **Node.js JavaScript execution is primarily single-threaded, but the Node.js runtime itself is not completely single-threaded.**

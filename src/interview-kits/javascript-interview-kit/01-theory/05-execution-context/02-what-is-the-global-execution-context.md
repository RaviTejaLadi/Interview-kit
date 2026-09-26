# What is the global execution context?

The **Global Execution Context (GEC)** is the execution context created when JavaScript starts executing a script or module.

It is the initial execution context.

For example:

```javascript id="q4q9n1"
// These statements execute in the global context.
const name = 'Ravi';

console.log(name);
```

Conceptually:

```text
┌──────────────────────────────┐
│ Global Execution Context     │
│                              │
│ name = "Ravi"                │
│                              │
│ console.log(name)            │
└──────────────────────────────┘
```

The global execution context is created before the rest of the program executes.

### Important distinction

In a browser, the global object is typically `window`.

In Node.js, the global object is `globalThis` (with Node also exposing `global`).

However:

> **Global execution context and global object are related concepts, but they are not the same thing.**

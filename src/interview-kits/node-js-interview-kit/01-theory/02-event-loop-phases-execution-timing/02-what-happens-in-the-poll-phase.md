# What happens in the Poll phase?

The **Poll phase is responsible for processing I/O events**.

Conceptually, it does two major things:

1. Processes available I/O callbacks.
2. Waits for new I/O events when appropriate.

For example:

```text
Network request
      ↓
Operating System
      ↓
Libuv detects I/O completion/readiness
      ↓
Poll phase
      ↓
Callback gets executed
      ↓
JavaScript
```

Suppose you have:

```javascript
// Register an asynchronous file read.
const fs = require('node:fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log('File read completed');
});

console.log('Continue executing');
```

The JavaScript thread doesn't sit there waiting for the file.

Instead, Node.js delegates the operation appropriately, and when it completes, the callback eventually becomes eligible for execution by the event loop.

### Poll phase decision

Conceptually, the poll phase asks:

```text
Are there I/O callbacks ready?
        │
    ┌───┴───┐
    │       │
   Yes      No
    │       │
Execute   Is there
callbacks  other work?
            │
       ┌────┴────┐
       │         │
      Yes        No
       │         │
 Continue    Wait for I/O
```

The exact implementation is more complex, but this mental model is excellent for interviews.

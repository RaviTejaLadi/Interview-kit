# What is `process.nextTick()` and how does its microtask queue take priority over all phases?

### Definition

`process.nextTick()` schedules a callback to execute **after the current JavaScript operation finishes, before the event loop proceeds to its next phase**.

It has a special queue called the **next tick queue**.

```javascript
// Schedule work in Node.js's next tick queue.
process.nextTick(() => {
  console.log("nextTick");
});

console.log("sync");
```

Output:

```text
sync
nextTick
```

### Why is `nextTick()` special?

It is **not one of the six event-loop phases**.

After the current JavaScript execution finishes, Node.js processes the `process.nextTick()` queue before continuing with the event loop.

Conceptually:

```text
Current JavaScript
       ↓
process.nextTick queue
       ↓
Promise microtasks
       ↓
Event Loop
       ↓
Next phase
```

### Important warning ⚠️

You can starve the event loop with recursive `nextTick()` calls.

```javascript
// Recursive nextTick callbacks can prevent the event loop from progressing.
function keepRunning() {
  process.nextTick(keepRunning);
}

keepRunning();
```

This can prevent timers and I/O callbacks from getting a chance to run.
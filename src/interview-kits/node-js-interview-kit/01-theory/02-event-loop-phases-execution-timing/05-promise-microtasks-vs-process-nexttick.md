# Promise microtasks vs `process.nextTick()`.

Both are asynchronous, but Node.js gives `process.nextTick()` higher priority.

Consider:

```javascript
// Compare Node.js nextTick callbacks with Promise microtasks.
process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("sync");
```

Output:

```text
sync
nextTick
Promise
```

### Priority

A useful Node.js mental model is:

```text
1. Current synchronous JavaScript
          ↓
2. process.nextTick queue
          ↓
3. Promise microtask queue
          ↓
4. Event loop phases
```

So:

```text
process.nextTick()
        ↓
Promise.then()
        ↓
setTimeout()
        ↓
setImmediate()
        ↓
I/O callbacks
```

Be careful with that last sequence: **timers, immediates, and I/O can have different ordering depending on where they're scheduled.** The important guaranteed distinction here is that `nextTick` is processed before the Promise microtask queue.

### Why does this matter?

A huge or recursively populated `nextTick` queue can prevent the event loop from reaching timers and I/O.

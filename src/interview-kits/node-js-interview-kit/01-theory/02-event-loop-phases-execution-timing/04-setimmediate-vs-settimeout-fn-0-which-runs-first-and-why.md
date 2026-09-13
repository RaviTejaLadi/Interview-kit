# `setImmediate()` vs `setTimeout(fn, 0)`: Which runs first and why?

This is a classic interview question.

### Short answer

**There is no universal guarantee that `setTimeout(fn, 0)` always runs before or after `setImmediate()`.**

Their order depends on where they are scheduled.

---

## At the top level

For example:

```javascript
// Compare a timer and an immediate scheduled from the main module.
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

The order can be affected by timing and environment.

You should **not** answer:

> `setTimeout(0)` always executes first.

That is incorrect.

---

## Inside an I/O callback

The situation is different.

```javascript
// Inside an I/O callback, setImmediate normally gets a chance before a zero-delay timer.
const fs = require("node:fs");

fs.readFile("data.txt", () => {
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);

  setImmediate(() => {
    console.log("setImmediate");
  });
});
```

Typically:

```text
setImmediate
setTimeout
```

### Why?

The callback is executing around the **poll phase**.

After poll, the event loop proceeds to the **check phase**, where `setImmediate()` callbacks execute.

```text
Poll
 ↓
Check
 ↓
setImmediate()
 ↓
Timers
 ↓
setTimeout()
```

### Interview answer 🎯

> **`setImmediate()` executes during the check phase, while `setTimeout()` executes during the timers phase. When both are scheduled from an I/O callback, `setImmediate()` normally runs first because the event loop moves from poll to check. At the top level, their order is not guaranteed.**

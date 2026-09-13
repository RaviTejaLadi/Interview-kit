# What are the 6 phases of the Libuv Event Loop?

The Libuv event loop is commonly explained using these phases:

```text
        ┌──────────────────────┐
        │   1. Timers          │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ 2. Pending Callbacks │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ 3. Idle / Prepare    │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ 4. Poll              │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ 5. Check             │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ 6. Close Callbacks   │
        └──────────┬───────────┘
                   │
                   └──────→ Repeat
```

### 1. Timers

Executes callbacks scheduled by:

- `setTimeout()`
- `setInterval()`

**Important:** A timer does not mean "execute exactly at this time."

For example:

```javascript
// Run the callback after at least approximately 0ms.
setTimeout(() => {
  console.log('Timer');
}, 0);
```

`0` means the callback becomes eligible after the minimum delay. It still has to wait for the event loop to reach the appropriate point.

---

### 2. Pending I/O Callbacks

Executes certain I/O callbacks that were deferred to the next loop iteration.

Examples can include callbacks related to some system-level I/O operations.

You generally don't interact with this phase directly.

---

### 3. Idle / Prepare

Internal Libuv phase.

It is primarily used internally by Node.js/Libuv to prepare for the upcoming poll phase.

As an application developer, you normally don't need to interact with this phase.

---

### 4. Poll

This is one of the **most important phases**.

The poll phase:

- Retrieves new I/O events.
- Executes appropriate I/O callbacks.
- May wait for new I/O events when there is nothing else to process.

We'll discuss this in detail in the next section.

---

### 5. Check

Executes callbacks scheduled using:

```javascript
setImmediate();
```

For example:

```javascript
// setImmediate callbacks execute during the check phase.
setImmediate(() => {
  console.log('Immediate');
});
```

---

### 6. Close Callbacks

Handles close-related callbacks.

For example:

```javascript
// The close callback runs when the socket is closed.
socket.on('close', () => {
  console.log('Socket closed');
});
```

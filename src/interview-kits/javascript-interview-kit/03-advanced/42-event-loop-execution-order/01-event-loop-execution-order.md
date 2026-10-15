# Event Loop Execution Order

The **JavaScript Event Loop Execution Order** determines which code runs first when synchronous code, microtasks, timers, I/O callbacks, and other asynchronous operations are mixed together.

Understanding this order is especially important for **JavaScript interviews, Node.js, and debugging asynchronous code**.

---

## 1. What is Event Loop Execution Order?

**Definition:**  
Event Loop Execution Order is the sequence in which JavaScript executes:

1. Synchronous code
2. Microtasks
3. Macrotasks / tasks
4. Additional microtasks created by those tasks
5. Node.js-specific event loop phases

A simplified browser model is:

```text
Synchronous Code
      ↓
Microtask Queue
      ↓
Task / Macrotask Queue
      ↓
Microtask Queue
      ↓
Next Task
```

---

## 2. What Runs First: Synchronous Code or Asynchronous Code?

**Definition:**  
Synchronous code always executes first because it runs directly on the **call stack**.

Asynchronous callbacks are scheduled for later execution.

```javascript
// Synchronous code executes before the timer callback.
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

console.log('C');

// Output:
// A
// C
// B
```

### Execution

```text
console.log("A")
      ↓
setTimeout() schedules callback
      ↓
console.log("C")
      ↓
Call stack becomes empty
      ↓
Timer callback executes
```

---

# 3. What is the Microtask Queue?

**Definition:**  
The **Microtask Queue** contains callbacks that should execute immediately after the current synchronous execution finishes, before the next task/macrotask.

Common microtasks include:

- `Promise.then()`
- `Promise.catch()`
- `Promise.finally()`
- `queueMicrotask()`
- `MutationObserver` in browsers
- `process.nextTick()` in Node.js has even higher priority than regular Promise microtasks

```javascript
// Promise callbacks are placed into the microtask queue.
console.log('A');

Promise.resolve().then(() => {
  console.log('B');
});

console.log('C');

// Output:
// A
// C
// B
```

---

# 4. What is a Macrotask / Task?

**Definition:**  
A **task** is work scheduled to execute in a later event-loop iteration.

Common examples include:

- `setTimeout`
- `setInterval`
- DOM events
- Some I/O callbacks
- `postMessage`

```javascript
// Timer callback runs as a later task.
console.log('Start');

setTimeout(() => {
  console.log('Timer');
}, 0);

console.log('End');

// Output:
// Start
// End
// Timer
```

> In browser specifications, **"task"** is generally the preferred term. "Macrotask" is commonly used informally.

---

# 5. What is the Basic Execution Priority?

A useful simplified rule is:

```text
1. Synchronous code
2. Microtasks
3. Next task
4. Microtasks created by that task
5. Next task
```

For example:

```javascript
// This demonstrates synchronous code → microtask → timer.
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output:
// 1
// 4
// 3
// 2
```

### Why?

```text
Call Stack
  ↓
1
4
  ↓
Microtask Queue
  ↓
3
  ↓
Task Queue
  ↓
2
```

---

# 6. What Happens When a Microtask Creates Another Microtask?

**Definition:**  
The event loop continues processing microtasks until the **microtask queue becomes empty** before moving to the next task.

```javascript
// Newly created microtasks run before the timer task.
Promise.resolve().then(() => {
  console.log('A');

  Promise.resolve().then(() => {
    console.log('B');
  });
});

setTimeout(() => {
  console.log('C');
}, 0);

// Output:
// A
// B
// C
```

The second Promise is added to the microtask queue while the first microtask is executing.

So:

```text
Microtask A
   ↓
adds Microtask B
   ↓
Microtask B
   ↓
Timer C
```

---

# 7. What Happens When a Timer Creates a Promise?

**Definition:**  
After a timer callback finishes, newly created microtasks are processed before the event loop proceeds to another task.

```javascript
// Microtasks created inside a timer run before the next task.
setTimeout(() => {
  console.log('Timer');

  Promise.resolve().then(() => {
    console.log('Promise');
  });
}, 0);

setTimeout(() => {
  console.log('Second Timer');
}, 0);

// Typical output:
// Timer
// Promise
// Second Timer
```

The important concept is:

```text
Timer callback
     ↓
Microtask
     ↓
Next task
```

---

# 8. What is `queueMicrotask()`?

**Definition:**  
`queueMicrotask()` explicitly schedules a function in the microtask queue.

```javascript
// queueMicrotask() schedules work after synchronous code.
console.log('A');

queueMicrotask(() => {
  console.log('B');
});

console.log('C');

// Output:
// A
// C
// B
```

It behaves similarly to a resolved Promise for execution ordering, but directly expresses the intention to schedule a microtask.

---

# 9. Promise vs `setTimeout(0)`

This is a common interview question.

**Definition:**  
A Promise callback is a **microtask**, while `setTimeout()` schedules a **task**.

Therefore, Promise callbacks normally execute first.

```javascript
// Promise microtasks run before timer tasks.
setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

// Output:
// Promise
// setTimeout
```

### Priority

```text
Synchronous code
       ↓
Promise / queueMicrotask
       ↓
setTimeout
```

---

# 10. What is the Execution Order in Node.js?

Node.js uses the **V8 JavaScript engine** together with **libuv**.

Node's event loop has several phases:

```text
┌─────────────┐
│   Timers    │
├─────────────┤
│ Pending I/O │
├─────────────┤
│    Idle     │
│   Prepare   │
├─────────────┤
│    Poll     │
├─────────────┤
│    Check    │
├─────────────┤
│    Close    │
└─────────────┘
```

The exact ordering of callbacks depends on the phase and the operation that scheduled them.

---

# 11. What is the `process.nextTick()` Queue?

**Definition:**  
`process.nextTick()` schedules a callback in Node.js's **next-tick queue**.

It runs before normal Promise microtasks.

```javascript
// process.nextTick() runs before Promise microtasks in Node.js.
console.log('Start');

Promise.resolve().then(() => {
  console.log('Promise');
});

process.nextTick(() => {
  console.log('nextTick');
});

console.log('End');

// Output:
// Start
// End
// nextTick
// Promise
```

A useful Node.js ordering is:

```text
Synchronous code
       ↓
process.nextTick()
       ↓
Promise microtasks
       ↓
Event Loop phases
```

---

# 12. `process.nextTick()` vs Promise

In Node.js:

```javascript
// This demonstrates Node.js microtask priority.
Promise.resolve().then(() => {
  console.log('Promise');
});

process.nextTick(() => {
  console.log('nextTick');
});

// Output:
// nextTick
// Promise
```

### Important

Don't think of `process.nextTick()` as one of the normal libuv event-loop phases.

It has its own queue that Node drains at high priority.

---

# 13. `setTimeout()` vs `setImmediate()`

**Definition:**

- `setTimeout()` schedules a callback for the **timers** mechanism.
- `setImmediate()` schedules a callback for the **check** phase.

From a main script, their relative order can vary depending on timing and environment.

However, inside an I/O callback, `setImmediate()` is generally executed before a `setTimeout(..., 0)` scheduled there.

```javascript
// Inside an I/O callback, setImmediate() runs before setTimeout(0).
const fs = require('node:fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate');
  });
});

// Typical output:
// setImmediate
// setTimeout
```

---

# 14. What Happens with `async/await`?

**Definition:**  
`await` pauses the current async function and schedules its continuation as a **microtask** once the awaited Promise settles.

```javascript
// await resumes the async function through the microtask queue.
async function test() {
  console.log('A');

  await Promise.resolve();

  console.log('B');
}

console.log('C');

test();

console.log('D');

// Output:
// C
// A
// D
// B
```

Execution:

```text
C
 ↓
test()
 ↓
A
 ↓
await pauses function
 ↓
D
 ↓
Promise settles
 ↓
B
```

---

# 15. Complete Example: Event Loop Execution Order

```javascript
// This example combines synchronous code, nextTick, Promise, timers, and setImmediate.
const fs = require('node:fs');

console.log('1');

setTimeout(() => {
  console.log('2 - setTimeout');
}, 0);

setImmediate(() => {
  console.log('3 - setImmediate');
});

Promise.resolve().then(() => {
  console.log('4 - Promise');
});

process.nextTick(() => {
  console.log('5 - nextTick');
});

fs.readFile(__filename, () => {
  console.log('6 - I/O');

  setTimeout(() => {
    console.log('7 - I/O setTimeout');
  }, 0);

  setImmediate(() => {
    console.log('8 - I/O setImmediate');
  });
});

console.log('9');
```

The important guaranteed part is:

```text
1
9
5 - nextTick
4 - Promise
```

After that, the exact ordering of timers, `setImmediate()`, and I/O callbacks can depend on the runtime and timing.

Inside the `fs.readFile()` callback, however:

```text
I/O callback
   ↓
setImmediate()
   ↓
setTimeout(0)
```

is the expected ordering.

---

# 16. What is Microtask Starvation?

**Definition:**  
**Microtask starvation** happens when continuously adding microtasks prevents the event loop from reaching normal tasks.

```javascript
// Continuously scheduling microtasks can prevent timers from running.
function loop() {
  queueMicrotask(loop);
}

loop();

setTimeout(() => {
  console.log('Timer');
}, 0);
```

The timer may never execute because the microtask queue never becomes empty.

### Why is this dangerous?

It can prevent:

- Timers
- UI updates
- I/O callbacks
- Other tasks

from getting a chance to execute.

---

# 17. Interview-Friendly Execution Order

For **browser JavaScript**, remember:

```text
┌─────────────────────┐
│ Synchronous Code    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Microtask Queue     │
│ Promise             │
│ queueMicrotask      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Next Task           │
│ setTimeout          │
│ events / I/O        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Microtasks again    │
└──────────┬──────────┘
           ↓
        Repeat
```

For **Node.js**, add:

```text
Synchronous code
       ↓
process.nextTick()
       ↓
Promise microtasks
       ↓
libuv event-loop phases
       ↓
microtasks
       ↓
next phase
```

---

# 18. Simple Rule to Remember 🧠

When you see an event-loop question, use this checklist:

```text
1. Execute synchronous code
2. Drain process.nextTick() in Node.js
3. Drain Promise/other microtasks
4. Execute the next task/event-loop callback
5. Drain microtasks again
6. Continue through the event loop
```

The biggest interview mistake is thinking **`setTimeout(fn, 0)` means "run immediately."** It does not. It means **"make this callback eligible to run in a future task/timer phase."**

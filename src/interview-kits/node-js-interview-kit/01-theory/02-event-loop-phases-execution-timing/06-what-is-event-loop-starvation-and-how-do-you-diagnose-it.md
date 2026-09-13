# What is Event Loop Starvation and how do you diagnose it?

### Definition

**Event Loop Starvation occurs when the event loop doesn't get enough opportunity to process other callbacks because one type of work continuously occupies the JavaScript thread or higher-priority queues.**

There are two common causes.

---

## Cause 1: CPU-heavy JavaScript

For example:

```javascript
// A CPU-heavy loop blocks the JavaScript thread.
setInterval(() => {
  console.log("Heartbeat");
}, 1000);

while (true) {
  // Blocks the event loop forever.
}
```

The problem is simple:

```text
JavaScript thread
       ↓
CPU-heavy work
       ↓
Event loop cannot process
       ↓
Timers / I/O / requests delayed
```

Even though Node.js uses asynchronous I/O, **JavaScript itself can still block the main thread**.

---

## Cause 2: Recursive microtasks

For example:

```javascript
// Continuously scheduling nextTick callbacks can starve timers and I/O.
function starve() {
  process.nextTick(starve);
}

starve();
```

The event loop keeps processing the next-tick queue and doesn't get a normal opportunity to advance through its phases.

---

# How do you diagnose Event Loop Starvation?

### 1. Measure event-loop delay

Node.js provides `monitorEventLoopDelay()` through `node:perf_hooks`.

```javascript
// Monitor how much the event loop is being delayed.
const { monitorEventLoopDelay } = require("node:perf_hooks");

const histogram = monitorEventLoopDelay();

histogram.enable();

setInterval(() => {
  console.log("Mean delay:", histogram.mean / 1e6, "ms");
  console.log("Max delay:", histogram.max / 1e6, "ms");
}, 5000);
```

Large event-loop delays can indicate that the JavaScript thread is being blocked.

---

### 2. Use Node.js profiling tools

For CPU-heavy problems, use tools such as:

* Node.js Inspector
* Chrome DevTools
* CPU profiles
* Flame graphs
* `--prof`

You are looking for functions consuming significant CPU time on the main thread.

---

### 3. Look for synchronous APIs

A common source of blocking is accidental use of synchronous APIs:

```javascript
// Synchronous filesystem access blocks the JavaScript thread.
const fs = require("node:fs");

const data = fs.readFileSync("large-file.txt", "utf8");

console.log(data);
```

For server-side request handling, asynchronous APIs are usually preferable.

---

# 🎯 Quick Interview Revision

| Topic                    | Key point                                                           |
| ------------------------ | ------------------------------------------------------------------- |
| **Timers**               | Executes eligible `setTimeout` / `setInterval` callbacks            |
| **Pending callbacks**    | Executes certain deferred I/O callbacks                             |
| **Idle / Prepare**       | Internal Libuv work                                                 |
| **Poll**                 | Processes I/O and can wait for new I/O                              |
| **Check**                | Executes `setImmediate()`                                           |
| **Close callbacks**      | Executes close-related callbacks                                    |
| **`process.nextTick()`** | Special Node.js queue processed before moving on                    |
| **Promise microtasks**   | Processed after `nextTick`, before normal event-loop progression    |
| **`setImmediate()`**     | Check phase                                                         |
| **`setTimeout(0)`**      | Timers phase; not guaranteed to beat `setImmediate()`               |
| **Starvation**           | Event loop is prevented/delayed from processing other work          |
| **Diagnosis**            | Event-loop delay monitoring + CPU profiling + finding blocking code |

### One sentence to remember

> **V8 executes JavaScript, Libuv drives the event loop and async I/O, `process.nextTick()` and Promise microtasks run between JavaScript turns, and the event loop phases process timers, I/O, immediates, and close events without blocking the main JavaScript thread.**

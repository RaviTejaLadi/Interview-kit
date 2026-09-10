# Is JavaScript synchronous or asynchronous?

**Definition:**
JavaScript is **synchronous by default**, but JavaScript runtimes provide mechanisms that allow it to perform **asynchronous operations**.

### Synchronous

Code executes sequentially and waits for the previous operation to finish.

```javascript
// Synchronous execution
console.log("Start");

const result = 10 + 20;

console.log(result);
console.log("End");
```

Output:

```text
Start
30
End
```

### Asynchronous

An asynchronous operation can complete later without blocking the JavaScript thread while it waits.

```javascript
// setTimeout schedules the callback to run later
console.log("Start");

setTimeout(() => {
  console.log("Timeout completed");
}, 1000);

console.log("End");
```

Output:

```text
Start
End
Timeout completed
```

The important distinction is:

> **JavaScript itself is synchronous by default, while the runtime provides asynchronous capabilities.**
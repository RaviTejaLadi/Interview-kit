# Is JavaScript single-threaded?

**Definition:**
Yes. **JavaScript's main execution model is single-threaded**, meaning JavaScript code on the main thread executes one task at a time using a single call stack.

For example:

```javascript
// These statements execute one at a time
console.log("First");
console.log("Second");
console.log("Third");
```

Output:

```text
First
Second
Third
```

However, JavaScript environments such as browsers and Node.js provide mechanisms for handling asynchronous operations using **Web APIs, the event loop, task queues, and sometimes worker threads**.

So:

> JavaScript execution on the main thread is single-threaded, but the runtime can perform work outside the JavaScript call stack.
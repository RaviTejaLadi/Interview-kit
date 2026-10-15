# Create a Promise from scratch at a basic level.

A JavaScript Promise represents the eventual success or failure of an asynchronous operation. It has three states:

- Pending: The operation hasn't completed.
- Fulfilled: The operation completed successfully.
- Rejected: The operation failed.

### Basic implementation

The following is a simplified Promise-like implementation for learning purposes. It supports resolving, rejecting, and registering a `.then()` callback, but it is not a complete replacement for the native Promise.

// Basic educational Promise implementation.

```
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = value;
      this.handlers.forEach((handler) => handler(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.value = reason;
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.state === "pending") {
      this.handlers.push(onFulfilled);
    }

    return this;
  }
}

const promise = new MyPromise((resolve) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise.then((value) => console.log(value));
```

Output after approximately one second:

```
Success!
```

### How it works

1. The constructor executes the `executor` function immediately.
2. `resolve()` changes the state to fulfilled.
3. Registered handlers run when the promise resolves.
4. The `try...catch` handles synchronous errors thrown by the executor.

Important limitation: This is not a standards-compliant Promise polyfill. A real Promise must also support chaining to new promises, rejection handlers, asynchronous callback scheduling, thenable adoption, and other behaviors. We will use native Promises for the remaining examples.

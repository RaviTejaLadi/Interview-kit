# What are Web Workers and what can they do?

**Web Workers** allow JavaScript to run in a **background thread separate from the main UI thread**.

Normally, JavaScript runs on the main thread. Heavy computation can block that thread and make the UI unresponsive.

Web Workers are useful for CPU-intensive tasks such as:

* Large calculations
* Data processing
* Parsing large datasets
* Image/data processing
* Cryptographic or computational operations

A worker communicates with the main thread using **`postMessage()`** and the **`message` event**.

### Main thread

```javascript
// Start a worker and send data to it
const worker = new Worker("worker.js");

worker.postMessage(1000000);

worker.onmessage = (event) => {
  console.log("Result:", event.data);
};
```

### worker.js

```javascript
// Perform heavy computation without blocking the main UI thread
self.onmessage = (event) => {
  const result = event.data * 2;

  self.postMessage(result);
};
```

### Important limitation

A Web Worker **does not have direct access to the DOM**.

So this will not work inside a normal worker:

```javascript
// Workers cannot directly manipulate the DOM
document.querySelector("#app");
```

Think of it as:

**Main Thread ↔ `postMessage()` ↔ Worker Thread**
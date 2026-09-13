# What is Node.js?

### Definition

**Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser.**

It is built on the **Google V8 JavaScript engine** and uses **Libuv** to provide asynchronous, non-blocking I/O.

Node.js is commonly used for:

* REST APIs
* Backend services
* Real-time applications
* WebSockets
* CLI tools
* Microservices
* Streaming applications

### How it works

A simplified architecture looks like this:

```text
Your JavaScript Code
        ↓
     Node.js
        ↓
 ┌───────────────┐
 │      V8       │ → Executes JavaScript
 └───────────────┘
        +
 ┌───────────────┐
 │     Libuv     │ → Async I/O + Event Loop
 └───────────────┘
        ↓
 Operating System
```

### Important point

Node.js is **not a programming language**.

It is a **runtime environment** for executing JavaScript.

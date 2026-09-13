# What is Google V8 vs Libuv?

V8 and Libuv have completely different responsibilities.

| V8                    | Libuv                                        |
| --------------------- | -------------------------------------------- |
| JavaScript engine     | Async I/O library                            |
| Executes JavaScript   | Handles I/O operations                       |
| Written mainly in C++ | Written mainly in C                          |
| Created by Google     | Used by Node.js                              |
| Handles JS execution  | Provides event loop and thread pool          |
| Manages JS memory/GC  | Handles networking, filesystem, timers, etc. |

### V8

**V8 is Google's JavaScript engine.**

It takes JavaScript code and executes it.

For example:

```javascript
// V8 executes this JavaScript code.
const result = 10 + 20;

console.log(result);
```

V8 is responsible for things such as:

- Parsing JavaScript
- Compiling JavaScript
- Executing JavaScript
- JIT optimization
- Garbage collection
- Managing JavaScript objects and memory

### Libuv

**Libuv is a C library that provides Node.js with asynchronous I/O capabilities.**

It provides:

- Event loop
- Thread pool
- File system APIs
- Networking support
- Timers
- Async DNS operations
- OS-specific I/O mechanisms

### Easy way to remember

Think of Node.js as a restaurant:

- **V8 = Chef** → executes JavaScript
- **Libuv = Waiter/manager** → handles waiting for external operations
- **OS = Kitchen suppliers** → provides files, network, DNS, etc.

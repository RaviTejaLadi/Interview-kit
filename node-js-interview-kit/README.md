# 🟢 Node.js Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. Node.js Architecture & Libuv ⭐⭐⭐⭐⭐

### Must Know

1. What is Node.js?
2. What is Google V8 vs Libuv?
3. Is Node.js completely single-threaded? (Distinction between JS execution thread and Libuv worker thread pool).
4. What is the Libuv Thread Pool and what operations use it (filesystem, crypto, dns lookups)?
5. How do you adjust the Libuv thread pool size (`UV_THREADPOOL_SIZE`)?
6. What is non-blocking I/O and how does the operating system handle it (epoll, kqueue, IOCP)?

---

## 2. Event Loop Phases & Execution Timing ⭐⭐⭐⭐⭐

### Must Know

1. What are the 6 phases of the Libuv Event Loop?
   - Timers phase
   - Pending I/O callbacks phase
   - Idle, prepare phase
   - Poll phase
   - Check phase
   - Close callbacks phase
2. What happens in the Poll phase?
3. What is `process.nextTick()` and how does its microtask queue take priority over all phases?
4. `setImmediate()` vs `setTimeout(fn, 0)`: Which runs first and why?
5. Promise microtasks vs `process.nextTick()`.
6. What is Event Loop Starvation and how do you diagnose it?

---

## 3. Buffers, Streams & Backpressure ⭐⭐⭐⭐⭐

### Must Know

1. What is a Buffer in Node.js?
2. Why are Buffers allocated outside the V8 heap in raw C++ memory?
3. What is a Stream and why are streams critical for handling large files?
4. What are the 4 types of Streams (`Readable`, `Writable`, `Duplex`, `Transform`)?
5. What is the Backpressure problem?
6. What happens when data is read faster than it can be written?
7. What do `highWaterMark`, `pause()`, `resume()`, and the `'drain'` event do?
8. Why should you always use `stream.pipeline()` instead of `.pipe()`?

---

## 4. Modules & Module Resolution ⭐⭐⭐⭐

### Must Know

1. CommonJS (`require`, `module.exports`) vs ES Modules (`import`, `export`).
2. How does Node.js resolve module paths?
3. What is module caching and do modules execute once or every time they are imported?
4. What are circular dependencies in Node.js and how are they handled?
5. What is the `package.json` file and what do `dependencies` vs `devDependencies` vs `peerDependencies` mean?
6. What is `package-lock.json` and why must it be committed to version control?

---

## 5. Concurrency & Scaling: Processes vs Threads ⭐⭐⭐⭐⭐

### Must Know

1. Why does Node.js only use 1 CPU core by default?
2. What is the `cluster` module and how does it scale HTTP throughput across cores?
3. How does the Primary (Master) process distribute incoming connections to workers (Round-Robin)?
4. What is `child_process` and what is the difference between `spawn()`, `exec()`, `execFile()`, and `fork()`?
5. What are `worker_threads` and when should they be used instead of `cluster`?
6. Shared memory in Worker Threads (`SharedArrayBuffer` & `Atomics`).

---

## 6. Error Handling & Process Lifecycle ⭐⭐⭐⭐⭐

### Must Know

1. Operational errors vs Programmer errors.
2. What happens if a Promise rejection is unhandled (`unhandledRejection`)?
3. What is `uncaughtException` and why should the process always be terminated after it occurs?
4. What is Graceful Shutdown and why is it mandatory in containerized / Kubernetes environments?
5. What are OS process termination signals: `SIGTERM` vs `SIGINT` vs `SIGKILL`?
6. How do you drain active HTTP connections before calling `process.exit()`?

---

## 7. Security & Best Practices ⭐⭐⭐⭐

### Must Know

1. What is ReDoS (Regular Expression Denial of Service)?
2. How can untrusted input block the single-threaded event loop?
3. What is SQL / NoSQL Injection and how do you prevent it (parameterized queries, sanitization)?
4. What is Helmet middleware and what HTTP security headers does it set?
5. What is CORS and how does it protect client browsers?
6. Rate limiting strategies: Token Bucket vs Leaky Bucket vs Sliding Window.
7. Why should you never run Node.js processes as the `root` user in Docker?

---

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

---

## 8. Streams & File Processing Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Process a multi-gigabyte log or CSV file line-by-line using `Transform` stream and `readline` with constant $O(1)$ memory usage.
2. Implement custom Writable stream that respects backpressure by returning `false` and emitting `'drain'`.
3. Implement file compression utility using `zlib.createGzip()` and `pipeline()`.

---

## 9. Middleware & Server Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Build an in-memory sliding window rate limiter middleware from scratch.
2. Build a central Express error-handling middleware that formats operational errors and hides internal stack traces in production.
3. Build a production HTTP server with graceful shutdown handling for `SIGTERM` and `SIGINT`.
4. Create an authentication middleware verifying JWTs from the `Authorization: Bearer <token>` header.

---

## 10. Concurrency & Asynchronous Utility Coding ⭐⭐⭐⭐⭐

### Must Implement

1. Implement an async task queue / pool that limits concurrent promises to $N$ active tasks at a time.
2. Offload an expensive CPU computation (e.g. prime factorization or image hashing) to a `Worker` thread.
3. Build a cluster master script that forks workers equal to `os.cpus().length` and restarts crashed workers.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 11. Event Loop Phases Order Diagram ⭐⭐⭐⭐⭐

```text
   ┌───────────────────────┐
┌─>│        Timers         │ setTimeout, setInterval
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     Pending I/O       │ OS deferred callbacks
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     Idle, Prepare     │ Internal
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │         Poll          │ Incoming connections, data reads (Blocks here!)
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │        Check          │ setImmediate
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │    Close Callbacks    │ socket.on('close')
└──┴───────────────────────┘
   * Microtasks (process.nextTick & Promise) run between EVERY phase transition!
```

---

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. V8 Engine vs Libuv
2. Single-threaded model vs Libuv thread pool
3. 6 phases of Libuv event loop
4. `process.nextTick()` priority
5. `setImmediate()` vs `setTimeout(fn, 0)`
6. Streams & Buffer mechanics
7. Backpressure handling
8. `stream.pipeline` vs `.pipe`
9. Cluster module vs Worker Threads
10. `child_process.fork()` vs `spawn()`
11. `uncaughtException` vs `unhandledRejection`
12. Graceful shutdown sequence (`SIGTERM`)
13. Event loop starvation & ReDoS attacks
14. CommonJS vs ES Modules
15. Rate limiting algorithms

### 💻 Coding

16. Large file streaming with `Transform` stream
17. Rate limiter middleware from scratch
18. Graceful shutdown with connection draining
19. Promise concurrency pool limiter
20. Centralized error handling middleware
21. JWT verification middleware
22. Worker thread CPU offloading
23. Clustering multi-core script
24. Line-by-line file reader with `readline`
25. Predict Event Loop execution order

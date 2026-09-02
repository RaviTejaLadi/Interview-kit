# 5. Concurrency & Scaling: Processes vs Threads



### Must Know

1. Why does Node.js only use 1 CPU core by default?
2. What is the `cluster` module and how does it scale HTTP throughput across cores?
3. How does the Primary (Master) process distribute incoming connections to workers (Round-Robin)?
4. What is `child_process` and what is the difference between `spawn()`, `exec()`, `execFile()`, and `fork()`?
5. What are `worker_threads` and when should they be used instead of `cluster`?
6. Shared memory in Worker Threads (`SharedArrayBuffer` & `Atomics`).

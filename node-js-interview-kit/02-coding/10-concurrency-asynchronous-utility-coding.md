# 10. Concurrency & Asynchronous Utility Coding

### Must Implement

1. Implement an async task queue / pool that limits concurrent promises to $N$ active tasks at a time.
2. Offload an expensive CPU computation (e.g. prime factorization or image hashing) to a `Worker` thread.
3. Build a cluster master script that forks workers equal to `os.cpus().length` and restarts crashed workers.

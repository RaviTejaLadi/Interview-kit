# 1. Node.js Architecture & Libuv



### Must Know

1. What is Node.js?
2. What is Google V8 vs Libuv?
3. Is Node.js completely single-threaded? (Distinction between JS execution thread and Libuv worker thread pool).
4. What is the Libuv Thread Pool and what operations use it (filesystem, crypto, dns lookups)?
5. How do you adjust the Libuv thread pool size (`UV_THREADPOOL_SIZE`)?
6. What is non-blocking I/O and how does the operating system handle it (epoll, kqueue, IOCP)?

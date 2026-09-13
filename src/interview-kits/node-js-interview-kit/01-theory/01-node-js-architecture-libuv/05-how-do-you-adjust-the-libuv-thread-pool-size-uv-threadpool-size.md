# How do you adjust the Libuv thread pool size (`UV_THREADPOOL_SIZE`)?

You can configure the thread pool using:

```text
UV_THREADPOOL_SIZE
```

The default size is:

```text
4
```

You can increase it when your application has many concurrent operations that rely on the thread pool.

### Linux/macOS

```bash
# Start Node.js with 8 Libuv worker threads.
UV_THREADPOOL_SIZE=8 node server.js
```

### Windows CMD

```cmd
:: Start Node.js with 8 Libuv worker threads.
set UV_THREADPOOL_SIZE=8 && node server.js
```

### Or from JavaScript

```javascript
// Configure the Libuv thread pool before performing relevant operations.
process.env.UV_THREADPOOL_SIZE = "8";
```

However, **setting it before Node.js starts is generally the safer approach** because some operations may initialize the thread pool before your application code changes the environment variable.

### Does increasing it always improve performance?

**No.**

More threads can introduce:

* CPU contention
* Context switching
* Memory overhead
* Reduced performance if the machine has limited CPU resources

So don't blindly set:

```text
UV_THREADPOOL_SIZE=100
```

Choose the value based on your workload and benchmark it.

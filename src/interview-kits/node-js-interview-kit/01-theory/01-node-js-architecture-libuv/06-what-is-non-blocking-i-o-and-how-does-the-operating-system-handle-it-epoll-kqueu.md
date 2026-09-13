# What is non-blocking I/O and how does the operating system handle it (epoll, kqueue, IOCP)?

### Definition

**Non-blocking I/O means the application does not have to wait for an I/O operation to finish before continuing execution.**

For example, suppose Node.js needs to read a file.

### Blocking approach

```text
Read file
   ↓
WAIT
   ↓
File finished
   ↓
Continue execution
```

The thread is stuck waiting.

### Non-blocking approach

```text
Start file read
      ↓
Continue executing JavaScript
      ↓
Other work happens
      ↓
File completes
      ↓
Callback is processed
```

This is a major reason Node.js can efficiently handle many concurrent I/O requests.

---

# How does the OS handle non-blocking I/O?

Different operating systems provide different mechanisms.

| OS          | Main mechanism |
| ----------- | -------------- |
| Linux       | `epoll`        |
| macOS / BSD | `kqueue`       |
| Windows     | `IOCP`         |

Libuv abstracts these differences.

So Node.js developers don't normally need to write:

```text
epoll
kqueue
IOCP
```

directly.

Instead:

```text
          Node.js
             ↓
           Libuv
             ↓
    ┌────────┼─────────┐
    ↓        ↓         ↓
  Linux    macOS     Windows
  epoll    kqueue     IOCP
```

## Linux — epoll

**epoll** is a Linux kernel mechanism for monitoring many file descriptors and notifying an application when they are ready for I/O.

For example, a Node.js server might have thousands of network connections.

Instead of constantly checking:

```text
Is connection 1 ready?
Is connection 2 ready?
Is connection 3 ready?
...
Is connection 10,000 ready?
```

`epoll` allows the OS to notify the application about descriptors that are ready.

---

## macOS — kqueue

**kqueue** is the event notification mechanism provided by macOS/BSD systems.

It allows applications to efficiently monitor events such as:

- Network activity
- File events
- Process events

Libuv uses `kqueue` where appropriate.

---

## Windows — IOCP

**IOCP (I/O Completion Ports)** is Windows' asynchronous I/O mechanism.

Instead of simply asking whether an operation is ready, the OS can notify the application when an asynchronous I/O operation has **completed**.

Libuv uses IOCP for many Windows networking operations.

---

# The Complete Picture

The easiest way to understand all six questions is this:

```text
                    Node.js Application
                           │
                           ↓
                    ┌─────────────┐
                    │     V8      │
                    │             │
                    │ Executes JS │
                    └──────┬──────┘
                           │
                           ↓
                    ┌─────────────┐
                    │   Event     │
                    │    Loop     │
                    └──────┬──────┘
                           │
                        Libuv
                     ┌─────┴─────┐
                     │           │
              OS Async I/O   Thread Pool
                     │           │
              ┌──────┼──────┐    │
              ↓      ↓      ↓    ↓
            epoll  kqueue  IOCP  FS
            Linux  macOS Windows Crypto
                              DNS
```

### Interview summary 🎯

If the interviewer asks **"Explain Node.js architecture in simple terms"**, you can say:

> **Node.js is a JavaScript runtime built on Google's V8 engine. V8 executes JavaScript on the main thread, while Libuv provides the event loop and asynchronous I/O capabilities. Node.js is not completely single-threaded because Libuv maintains a worker thread pool for operations such as filesystem access, certain DNS lookups, cryptography, and compression. For network I/O, Libuv uses OS-level mechanisms such as epoll on Linux, kqueue on macOS, and IOCP on Windows. This allows Node.js to handle many concurrent I/O operations without blocking the JavaScript thread.**

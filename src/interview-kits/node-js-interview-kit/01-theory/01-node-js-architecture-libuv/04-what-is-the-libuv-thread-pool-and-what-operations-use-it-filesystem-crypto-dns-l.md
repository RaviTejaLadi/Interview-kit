# What is the Libuv Thread Pool and what operations use it (filesystem, crypto, dns lookups)?

### Definition

The **Libuv thread pool** is a group of background worker threads used by Libuv for certain operations that cannot efficiently be handled directly through the operating system's asynchronous mechanisms.

By default, Libuv has **4 worker threads**.

You can increase this number when necessary.

### Common operations using the thread pool

Important examples include:

* File system operations
* Some DNS operations
* Cryptographic operations
* Compression operations

For example:

```javascript
// The filesystem operation can be handled through Libuv's thread pool.
const fs = require("node:fs");

fs.readFile("./large-file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

console.log("This can execute before the file is read.");
```

Conceptually:

```text
fs.readFile()
      ↓
    Node.js
      ↓
    Libuv
      ↓
 Thread Pool
      ↓
Filesystem
      ↓
 Callback queued
      ↓
 Event Loop
      ↓
JavaScript callback
```

### Important DNS distinction

DNS is slightly more nuanced.

Node.js's `dns.lookup()` generally uses the operating system's `getaddrinfo()` and therefore uses the Libuv thread pool.

Other DNS APIs, such as `dns.resolve()`, use asynchronous DNS mechanisms rather than the thread pool.

This distinction is useful in interviews.

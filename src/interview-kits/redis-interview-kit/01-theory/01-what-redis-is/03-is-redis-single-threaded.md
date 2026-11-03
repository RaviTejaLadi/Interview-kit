# Is Redis single-threaded?

Yes, Redis primarily processes commands on a single main thread, but Redis is not entirely single-threaded.

Redis uses an event loop to handle many client connections efficiently. It processes commands sequentially on the main execution thread, which avoids much of the coordination overhead associated with concurrent command execution.

However, Redis can use additional threads for tasks such as background I/O and, in supported configurations, client socket reads and writes. Persistence and other background operations can also involve separate processes or threads.&#x20;

### How does it work?

Imagine a restaurant with one chef and many customers. The chef takes orders from different customers and prepares each dish quickly, one at a time. Customers don't need a dedicated chef each.

Redis follows a similar model for command execution.

Client A: `GET user:1`

Client B: `SET count 10`

Client C: `INCR count`

Redis event loop

Processes commands sequentially

Returns responses to clients

### What is the disadvantage?

A slow command can delay other clients because the main thread cannot process their commands until the slow operation finishes.

For example, avoid running `KEYS *` on a large production dataset. It scans the keyspace in one operation and can block other commands. Use `SCAN` for incremental iteration instead.&#x20;

Interview takeaway: Redis is fast not because it executes all commands in parallel, but because it minimizes per-command overhead and handles requests efficiently.

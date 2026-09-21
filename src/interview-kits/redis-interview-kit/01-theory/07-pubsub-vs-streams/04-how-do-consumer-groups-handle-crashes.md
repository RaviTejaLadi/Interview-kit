# How do consumer groups handle crashes?

**Definition:**
If a worker dies after `XREADGROUP` but before `XACK`, the message stays in the PEL. Another worker can `XCLAIM` or `XAUTOCLAIM` after a idle time. Consumers must be idempotent because a crash after side effect but before ACK duplicates work.

**Key points:**
- At-least-once, not exactly-once.
- Store a processed-id set or use DB unique constraints.
- Monitor PEL length — stuck jobs.
- `XACK` only after successful side effect.
- Trim streams (`MAXLEN ~ 10000`) so they do not grow forever.

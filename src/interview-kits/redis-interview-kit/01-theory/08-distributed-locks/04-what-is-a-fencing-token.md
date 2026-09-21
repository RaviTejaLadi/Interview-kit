# What is a fencing token?

**Definition:**
A fencing token is a monotonically increasing number issued with the lock. The storage layer (DB) rejects writes with a stale token. Even if two processes think they hold a Redis lock, only the higher token wins at the resource. Redis `INCR` can issue tokens; the resource must enforce them.

**Key points:**
- Locks in Redis do not automatically fence.
- Databases can store `WHERE version = old` optimistic concurrency instead.
- This is the answer to 'what if the lock expires mid-write?'
- Exactly-once side effects still need idempotency keys.
- Kleppmann argues fencing is required for correctness.

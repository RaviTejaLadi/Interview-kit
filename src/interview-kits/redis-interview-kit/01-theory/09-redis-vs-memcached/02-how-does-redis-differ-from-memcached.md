# How does Redis differ from Memcached?

**Definition:**
Redis has rich types, optional persistence, replication/cluster, pub/sub, streams, Lua, and transactions. Memcached is simpler, multi-threaded, and cache-only. Redis is single-threaded for command execution (per event loop), which can bottleneck CPU-heavy workloads but makes atomic operations easy. Choose Redis if you need more than blobs; Memcached if you want a dumb, fast, multi-core cache.

**Key points:**
- Structures vs opaque bytes.
- Persistence optional vs none.
- Atomic `INCR`/`SET NX` vs limited ops.
- One Redis can replace several tools (not always wise).
- Memory overhead and features are higher in Redis.

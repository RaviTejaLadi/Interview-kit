# What is write-through caching?

**Definition:**
On write, the application (or cache layer) updates the cache and the database together as part of the write path. Reads almost always hit a warm cache for those keys. Latency of writes increases; consistency is easier than fire-and-forget cache-aside if both writes succeed in a defined order.

**Key points:**

- Write path is slower (two stores).
- Reads are fast if the working set is fully cached.
- Failure handling: did DB succeed but cache fail?
- Often used with a cache library or proxy (not only hand-rolled Redis).
- Still need a TTL as a safety net.

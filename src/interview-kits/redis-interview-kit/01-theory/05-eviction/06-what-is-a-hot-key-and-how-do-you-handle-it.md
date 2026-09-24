# What is a hot key and how do you handle it?

**Definition:**
A hot key is requested so often that one Redis shard/CPU or network path saturates. Fixes: replicate reads, local in-process cache (with short TTL), split the key (sharding the value), or cache at the CDN/app layer. Cluster does not help if all traffic is one key (one slot).

**Key points:**

- Hash tags can accidentally concentrate load.
- Local LRU (TinyLFU) in the app reduces Redis QPS.
- Read replicas for read-heavy hot keys (accept staleness).
- Detect via `redis-cli --hotkeys` / proxy metrics.
- Writing to a hot key is even harder — serialize or partition.

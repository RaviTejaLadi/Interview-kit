# What is Memcached?

**Definition:**
Memcached is a high-performance distributed memory object caching system. It stores key/value blobs with LRU eviction, is multi-threaded, and does not persist. It is a cache, not a data structure server. Clients typically shard keys with consistent hashing.

**Key points:**

- Simple get/set/delete and some counters.
- No persistence, no replica-as-source-of-truth story.
- Multi-threaded: uses multiple cores per node easily.
- Very predictable as a pure cache.
- Still widely used (e.g. some large web stacks).

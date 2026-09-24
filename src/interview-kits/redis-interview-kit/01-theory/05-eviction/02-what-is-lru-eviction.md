# What is LRU eviction?

**Definition:**
LRU (least recently used) drops keys that have not been accessed recently. Redis approximates LRU. Policies: `allkeys-lru` (any key) and `volatile-lru` (only keys with TTL). LRU is the usual cache policy when access patterns have locality.

**Key points:**

- Good default for generic object caches.
- `allkeys-lru` will drop keys even without TTL — do not store irreplaceable data.
- `volatile-lru` requires expires on cache keys.
- Approximation is not perfect LRU; good enough.
- Hot keys stay; one-time keys leave.

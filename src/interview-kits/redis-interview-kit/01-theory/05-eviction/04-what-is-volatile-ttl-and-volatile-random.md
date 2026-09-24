# What is volatile-ttl and volatile-random?

**Definition:**
`volatile-ttl` evicts keys with a TTL, preferring those closest to expiry. `volatile-random` / `allkeys-random` pick randomly among eligible keys. Random is cheap and surprisingly OK. `volatile-ttl` fits when TTL encodes remaining value.

**Key points:**

- `noeviction` = fail writes rather than drop data (sessions you refuse to lose — but then you must size memory).
- Random avoids LRU bookkeeping.
- Mixing durable keys and cache keys on one instance is how `allkeys-lru` pages out sessions — split instances or use TTL+volatile policy.
- Name the policy in interviews; do not say 'Redis deletes old stuff'.
- Test by filling a tiny `maxmemory` in staging.

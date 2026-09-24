# What is a cache stampede (thundering herd)?

**Definition:**
When a hot key expires (or is evicted), many concurrent requests miss at once and all query the database, overloading it. The cache then gets rebuilt many times. It often follows a TTL alignment (every key at `:00`) or a deploy that flushes Redis.

**Key points:**

- Hot keys + short TTL = risk.
- Synchronized expiry is worse — add jitter.
- DB CPU and pool exhaustion are the symptoms.
- CDN origin storms are the same idea.
- Locks, singleflight, and stale-while-revalidate are the fixes.

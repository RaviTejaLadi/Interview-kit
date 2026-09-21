# What are common Redis use cases?

**Definition:**
Caching (page fragments, query results), session storage, rate limiting, feature flags, distributed locks, leaderboards (sorted sets), autocomplete (sorted sets / search modules), job queues (lists or streams), and pub/sub for fan-out. Using Redis as the only source of truth is possible with persistence but needs a durability plan.

**Key points:**
- Cache is the #1 interview answer — then be specific (cache-aside).
- Sessions: fast reads, TTL = session lifetime.
- Streams beat pub/sub when you need history and consumer groups.
- Do not put huge blobs if you cannot bound RAM.
- Pick the data type that matches the access pattern.

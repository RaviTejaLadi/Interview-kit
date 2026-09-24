# How should you split Redis instances by workload?

**Definition:**
Do not run a huge cache, a session store, and a lock manager with `allkeys-lru` on one box. Cache keys will evict sessions. Split by purpose (or Redis logical DBs is a weak isolation — prefer separate instances). Different `maxmemory-policy` per instance.

**Key points:**

- Cache instance: `allkeys-lru` + TTLs.
- Session instance: `noeviction` or `volatile-ttl` with careful sizing.
- Queues/streams: their own instance; eviction would drop jobs.
- Cluster vs multiple standalone: operational choice.
- Key prefixes are not isolation.

> 💡 Sessions + cache on one LRU Redis is a classic outage postmortem.

# What is cache-aside (lazy loading)?

**Definition:**
The application owns the cache. Read: get from Redis; on miss, read DB, then populate Redis. Write: write DB, then delete or update the cache key. This is the most common application-level cache pattern.

**Key points:**

- Cache is not the source of truth.
- Miss path must be correct under concurrency (stampede).
- Invalidation on write is the hard part.
- Easy to add incrementally to an existing app.
- Stale data until TTL if you forget to invalidate.

```text
read:  GET cache -> hit? return : load DB -> SET cache -> return
write: UPDATE DB -> DEL cache (or SET new value)
```

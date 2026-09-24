# How does Redis expire keys internally?

**Definition:**
Redis uses lazy expiration (delete when accessed if stale) plus a periodic random sample of keys with expires to delete them. Expired keys can still occupy memory until sampled. This is why you can see memory hold expired keys briefly.

**Key points:**

- Do not assume instant deletion of every expired key.
- Volatile-lru eviction is separate from TTL expiry.
- Many keys expiring at the same timestamp causes expiry storms — add jitter.
- Persist: expired keys should not resurrect after reload if already deleted; understand AOF rewrite vs RDB snapshot timing at a high level.
- Monitoring `expired_keys` in INFO.

> 💡 Jitter TTLs (`60 + random(0, 10)`) to avoid thundering expiry.

# How do TTLs interact with hashes and lists?

**Definition:**
TTL is on the key, not on individual hash fields or list elements in classic Redis. Expiring `user:1` drops all hash fields. To expire one field, use a separate key (`user:1:email`) or newer field-level expiration if your version supports it. Capped lists (`LTRIM`) bound memory without TTL.

**Key points:**
- Session object as one hash + one TTL on the key is a common pattern.
- Per-item expiry → per-item keys or zset of timestamps.
- ZSET score = expiry timestamp + periodic `ZRANGEBYSCORE` cleanup is an old pattern.
- Do not assume `HSET` resets TTL; it does not.
- Know your Redis version before promising field TTL.

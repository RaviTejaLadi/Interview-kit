# Implement singleflight with SET NX EX on cache miss

**Definition:**
On miss, try to acquire a lock. If acquired, load DB, `SET` cache with TTL+jitter, release lock. If not acquired, wait and `GET` again (or return stale). This is the coding exercise paired with distributed locks theory.

**Key points:**

- Lock TTL > DB query time.
- Always fill cache before unlock.
- Sleep with cap; then hit DB as last resort (or fail 503).
- Jitter the data TTL.
- Per-key lock, not a global lock.

```javascript
async function getOrLoad(redis, key, load, { ttl = 60, lockMs = 3000 } = {}) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const token = crypto.randomUUID();
  const locked = await redis.set(`lock:${key}`, token, 'NX', 'PX', lockMs);
  if (locked) {
    try {
      const value = await load();
      await redis.set(key, JSON.stringify(value), 'EX', ttl + Math.floor(Math.random() * 10));
      return value;
    } finally {
      await redis.eval(unlockLua, 1, `lock:${key}`, token);
    }
  }
  await new Promise((r) => setTimeout(r, 50));
  const retry = await redis.get(key);
  if (retry) return JSON.parse(retry);
  return load();
}
```

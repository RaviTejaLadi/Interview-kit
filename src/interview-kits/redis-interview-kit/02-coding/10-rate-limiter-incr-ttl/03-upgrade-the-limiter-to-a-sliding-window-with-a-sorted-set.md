# Upgrade the limiter to a sliding window with a sorted set

**Definition:**
Store request timestamps as zset members. On each request, `ZREMRANGEBYSCORE` old entries, `ZADD` now, `ZCARD`. Compare to limit. More accurate than fixed windows; more Redis ops and memory per user.

**Key points:**

- Score = timestamp, member = unique request id.
- Memory = one zset element per request in the window.
- Good for stricter APIs; heavy for huge QPS.
- Pipeline the commands.
- Still need a TTL on the zset key to clean idle users.

```javascript
export async function slidingAllow(redis, userId, { limit = 100, windowMs = 60_000 } = {}) {
  const key = `rlz:${userId}`;
  const now = Date.now();
  const pipe = redis.multi();
  pipe.zRemRangeByScore(key, 0, now - windowMs);
  pipe.zAdd(key, { score: now, value: `${now}:${Math.random()}` });
  pipe.zCard(key);
  pipe.expire(key, Math.ceil(windowMs / 1000));
  const results = await pipe.exec();
  const count = results[2];
  return { ok: count <= limit, count };
}
```

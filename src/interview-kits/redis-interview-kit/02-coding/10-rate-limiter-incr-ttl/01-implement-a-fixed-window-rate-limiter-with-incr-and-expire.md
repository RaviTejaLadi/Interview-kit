# Implement a fixed-window rate limiter with INCR and EXPIRE

**Definition:**
Key by user and window (`rl:{userId}:{floor(now/window)}`). `INCR`; if the result is 1, `EXPIRE` the key for the window length. If count > limit, reject. This is the standard Redis interview limiter.

**Key points:**
- `INCR` is atomic.
- Set TTL only when count == 1 to avoid resetting the window.
- Fixed window allows burst at the boundary.
- Use a pipeline or Lua if you want one round trip.
- Fail-open vs fail-closed if Redis errors.

```javascript
export async function allowRequest(redis, userId, { limit = 100, windowSec = 60 } = {}) {
  const window = Math.floor(Date.now() / 1000 / windowSec);
  const key = `rl:${userId}:${window}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSec);
  return { ok: count <= limit, count, remaining: Math.max(0, limit - count) };
}
```

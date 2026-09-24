# How do you prevent stampede when Redis is flushed?

**Definition:**
A `FLUSHALL` or fail-over empty node makes every key miss. Serve from DB with concurrency limits (semaphore), serve degraded content, or pre-warm the hottest keys. Application-level circuit breakers (`max 200 concurrent origin loads`) protect the DB. Do not let the web tier unlimited-parallel rebuild.

**Key points:**

- Global semaphore in Redis (`INCR origin:inflight`).
- Return 503 with Retry-After if origin overloaded.
- Pre-warm top 1000 keys after failover.
- Disable cache-flush in production runbooks.
- Local in-process cache can still serve briefly if Redis dies — with TTL.

```javascript
const inflight = await redis.incr('origin:inflight');
await redis.expire('origin:inflight', 5);
if (inflight > 200) {
  await redis.decr('origin:inflight');
  throw Object.assign(new Error('origin overloaded'), { status: 503 });
}
```

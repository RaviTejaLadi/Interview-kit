# Implement stale-while-revalidate with two keys

**Definition:**
Store `article:1` (fresh TTL) and `article:1:stale` (longer TTL). On fresh miss, serve stale if present and trigger a background rebuild with a lock. Users never wait on the DB for this key after the first fill. This is how CDNs and good caches stay up during origin slowness.

**Key points:**
- Stale TTL might be 10× fresh TTL.
- Only one rebuild thanks to the lock.
- If both missing, you must block on DB (cold start).
- Mark responses with `X-Cache: STALE`.
- Great interview follow-up to simple SET NX.

```javascript
async function getSWR(redis, key, load) {
  const fresh = await redis.get(key);
  if (fresh) return { value: JSON.parse(fresh), state: 'fresh' };
  const stale = await redis.get(`${key}:stale`);
  refreshInBackground(redis, key, load);
  if (stale) return { value: JSON.parse(stale), state: 'stale' };
  const value = await load();
  await writeFreshAndStale(redis, key, value);
  return { value, state: 'miss' };
}
```

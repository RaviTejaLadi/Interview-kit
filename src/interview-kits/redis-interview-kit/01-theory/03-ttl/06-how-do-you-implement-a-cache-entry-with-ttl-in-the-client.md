# How do you implement a cache entry with TTL in the client?

**Definition:**
Cache-aside: on miss, load DB, `SET key value EX ttl`. Choose TTL from freshness needs, not randomly. Too long → stale; too short → DB load. Add jitter. For stampede, see lock/singleflight patterns.

**Key points:**
- Serialize values (JSON) and version the schema in the key (`v2:`).
- Negative caching: cache empty results briefly to protect the DB.
- Null vs missing: distinguish 'cached not found' from 'not in cache'.
- Measure hit rate after choosing TTL.
- Write path must invalidate or update the key.

```javascript
async function getArticle(id) {
  const key = `article:v1:${id}`;
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);
  const row = await db.articles.find(id);
  if (row) await redis.set(key, JSON.stringify(row), 'EX', 60 + Math.floor(Math.random() * 10));
  return row;
}
```

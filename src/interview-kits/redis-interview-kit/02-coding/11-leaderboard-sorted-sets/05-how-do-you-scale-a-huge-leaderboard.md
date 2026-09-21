# How do you scale a huge leaderboard?

**Definition:**
A single zset on one cluster slot can become a hot key. Shard by region or league (`leaderboard:{region}`), keep only top K (trim with `ZREMRANGEBYRANK` below rank 10000), or move to a dedicated store. Display pages beyond top K can be 'not ranked'.

**Key points:**
- Trim: keep top 10k, drop the rest.
- Sharding breaks global rank — usually OK per league.
- Cache the top 10 list in a string with 1s TTL to protect Redis.
- Writes (`ZINCRBY`) still hit the zset.
- Know this is a hot-key problem, not a 'buy bigger RAM only' problem.

```javascript
async function trimTop(redis, key, keep = 10_000) {
  const size = await redis.zCard(key);
  if (size > keep) {
    await redis.zRemRangeByRank(key, 0, size - keep - 1);
  }
}
```

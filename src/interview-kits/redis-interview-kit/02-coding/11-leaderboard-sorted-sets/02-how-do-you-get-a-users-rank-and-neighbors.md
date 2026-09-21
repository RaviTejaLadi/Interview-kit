# How do you get a user's rank and neighbors?

**Definition:**
`ZREVRANK` gives 0-based rank from the top. Fetch a window `ZREVRANGE rank-5 rank+5` for a 'you are here' UI. Handle missing users (null rank).

**Key points:**
- `ZRANK` is low-to-high; leaderboards usually want `ZREVRANK`.
- Rank is 0-based in Redis; add 1 for display.
- Neighbors need bounds checks at the top/bottom.
- Large zsets: rank is still log N.
- If you only keep top 10k, users outside have no rank — document it.

```javascript
export async function aroundMe(redis, key, userId, span = 5) {
  const rank = await redis.zRevRank(key, userId);
  if (rank == null) return { rank: null, neighbors: [] };
  const start = Math.max(0, rank - span);
  const stop = rank + span;
  const neighbors = await redis.zRangeWithScores(key, start, stop, { REV: true });
  return { rank: rank + 1, neighbors };
}
```

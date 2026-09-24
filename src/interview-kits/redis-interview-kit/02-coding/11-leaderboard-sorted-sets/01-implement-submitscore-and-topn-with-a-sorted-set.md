# Implement submitScore and topN with a sorted set

**Definition:**
`ZADD leaderboard score userId` upserts the user's score. `ZREVRANGE 0 N-1 WITHSCORES` returns the top N. This is the canonical Redis coding question.

**Key points:**

- Member is `userId`, score is points.
- `ZADD` updates if the user already exists.
- Use `ZREVRANGE` for high-to-low.
- Tie-break is lexicographic member if scores equal.
- Cap `N` (max 100) in the API.

```javascript
export function leaderboard(redis, key = 'game:scores') {
  return {
    submit: (userId, score) => redis.zAdd(key, { score, value: userId }),
    topN: (n = 10) => redis.zRangeWithScores(key, 0, n - 1, { REV: true }),
  };
}
```

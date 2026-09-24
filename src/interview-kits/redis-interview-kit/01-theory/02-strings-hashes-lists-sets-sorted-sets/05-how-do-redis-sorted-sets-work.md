# How do Redis sorted sets work?

**Definition:**
Sorted sets (ZSETs) map member → score and keep members ordered by score (then lexicographically). `ZADD`, `ZRANGE`, `ZREVRANGE`, `ZRANK`, `ZINCRBY`. This is the leaderboard type. Scores are floating point. Unique members — adding an existing member updates its score.

**Key points:**

- Leaderboards: score = points, member = userId.
- `ZREVRANGE 0 9 WITHSCORES` = top 10.
- `ZRANGEBYSCORE` for time indexes (score = timestamp).
- `ZPOPMIN` for delayed queues (score = executeAt).
- `ZRANGE` is O(log N + M); still avoid huge M.

```bash
ZADD game:scores 100 user:1 250 user:2
ZREVRANGE game:scores 0 9 WITHSCORES
ZRANK game:scores user:1
```

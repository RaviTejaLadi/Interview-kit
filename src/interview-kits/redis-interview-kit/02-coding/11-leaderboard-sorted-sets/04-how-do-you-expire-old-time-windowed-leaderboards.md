# How do you expire old time-windowed leaderboards?

**Definition:**
Use a key per window: `game:scores:2026-09-16` or `game:scores:{week}`. Set a TTL on the key after the week ends (keep for display a few days). Do not store all-time and weekly in one zset without encoding time in the member.

**Key points:**
- Daily/weekly keys are simple and cache-friendly.
- TTL the previous window after it closes.
- All-time board is a separate key.
- Rolling 24h windows may use score=timestamp and `ZREMRANGEBYSCORE` — that is a different pattern (activity), not total points.
- Document timezone for 'daily'.

```javascript
const key = `game:scores:${isoWeek(new Date())}`;
await redis.zIncrBy(key, points, userId);
await redis.expire(key, 60 * 60 * 24 * 21);
```

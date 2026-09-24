# Can Memcached do rate limiting and leaderboards?

**Definition:**
You can `incr` in Memcached for a crude counter, but you lack TTL-on-set atomicity as clean as Redis `SET NX EX` / `INCR`+expire in one place historically (Memcached added some features over time). Leaderboards need sort-by-score: Redis zsets. Rate limiters and ranked lists are Redis-shaped problems.

**Key points:**

- Redis `INCR` + `EXPIRE` is the textbook limiter.
- ZSET leaderboards have no Memcached equivalent.
- Locks: Redis `SET NX EX` is the standard story.
- You could build these in the app with Memcached, poorly.
- Interview: map the data structure to Redis.

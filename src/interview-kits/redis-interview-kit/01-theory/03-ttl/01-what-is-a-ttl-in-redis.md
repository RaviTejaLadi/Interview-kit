# What is a TTL in Redis?

**Definition:**
TTL (time to live) is the remaining lifetime of a key. When it expires, Redis deletes the key (actively in the background and passively on access). Set it with `EXPIRE`, `PEXPIRE`, `SET key val EX seconds`, or `SETEX`. `TTL key` returns remaining seconds, `-1` if no expire, `-2` if missing.

**Key points:**
- Expiration is how caches stay bounded.
- Sessions: TTL = idle or absolute timeout.
- Rate limit windows: TTL on the counter key.
- `PERSIST` removes the timeout.
- `SET` without `KEEPTTL` can wipe an existing TTL — a common bug.

```bash
SET cache:article:9 '<html>...' EX 60
TTL cache:article:9
EXPIRE cache:article:9 120
```

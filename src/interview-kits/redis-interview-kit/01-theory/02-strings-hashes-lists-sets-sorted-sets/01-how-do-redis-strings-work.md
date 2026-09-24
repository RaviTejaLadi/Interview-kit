# How do Redis strings work?

**Definition:**
Strings are binary-safe blobs up to 512 MB (do not use them that large). Commands: `SET`, `GET`, `MGET`, `INCR`, `SETNX`, `SETEX`. They model counters, cache blobs, and distributed locks (`SET key value NX EX`). `INCR` is atomic and is the core of simple rate limiters.

**Key points:**

- `INCR` on a missing key starts at 0 then increments.
- `MGET` reduces round trips.
- `SET NX EX` is the lock primitive.
- JSON documents are often stored as strings (or RedisJSON module).
- Do not `INCR` a non-integer string — Redis returns an error.

```bash
SET session:abc '{ "userId": 1 }' EX 1800
INCR pageviews:home
GET pageviews:home
```

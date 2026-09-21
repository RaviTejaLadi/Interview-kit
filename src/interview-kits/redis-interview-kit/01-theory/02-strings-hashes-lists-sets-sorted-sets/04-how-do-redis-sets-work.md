# How do Redis sets work?

**Definition:**
Sets are unordered unique strings. `SADD`, `SISMEMBER`, `SMEMBERS`, `SINTER`, `SUNION`, `SDIFF`. Use them for tags, unique visitors (with cardinality caveats), and relationship graphs at small scale. `SMEMBERS` is O(N). `SSCAN` iterates safely.

**Key points:**
- Membership tests are O(1) average.
- Intersections are great for 'users who like A and B' if sets are not huge.
- HyperLogLog (`PFADD`) estimates unique counts with tiny memory — not a set.
- Do not `SMEMBERS` a million-id set in an HTTP request.
- `SMOVE` is atomic between sets.

```bash
SADD post:42:likes user:1 user:7
SISMEMBER post:42:likes user:1
SINTER user:1:friends user:2:friends
```

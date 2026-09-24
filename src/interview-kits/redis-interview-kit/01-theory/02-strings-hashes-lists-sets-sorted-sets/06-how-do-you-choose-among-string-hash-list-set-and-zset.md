# How do you choose among string, hash, list, set, and zset?

**Definition:**
Match the access pattern: blob or counter → string; object with fields → hash; queue/log → list or stream; unique membership → set; ranked/range-by-score → zset. Wrong types lead to `O(N)` scans or client-side sorting.

**Key points:**

- If you `GET` JSON and parse to sort in Node, you probably wanted a zset.
- If you `HGETALL` a shopping cart, hash is right; if each item is huge, maybe separate keys.
- TTL is per key, not per hash field (unless Redis 7.4+ field expiration / modules — know your version).
- Streams for event logs with consumer groups.
- Interviewers want this mapping more than memorizing every command.

> 💡 Say the access pattern first, then the type, then one command example.

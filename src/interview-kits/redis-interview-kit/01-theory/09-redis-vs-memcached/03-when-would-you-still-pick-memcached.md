# When would you still pick Memcached?

**Definition:**
When the need is only 'cache serialized objects across web workers', you want multi-core get/set throughput, you already operate Memcached, or you want the cache to be impossible to accidentally persist as a database. Some teams run both: Memcached for page cache, Redis for sessions and locks.

**Key points:**
- Horizontal scale with client-side hashing is straightforward.
- Fewer ways to shoot yourself (no `KEYS`, no huge lists).
- Ops familiarity is a valid reason.
- If you need leaderboards, Redis wins immediately.
- Do not migrate for fashion.

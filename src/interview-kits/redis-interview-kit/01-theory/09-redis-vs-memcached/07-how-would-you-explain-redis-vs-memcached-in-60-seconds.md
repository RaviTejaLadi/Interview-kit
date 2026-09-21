# How would you explain Redis vs Memcached in 60 seconds?

**Definition:**
Memcached is a multi-threaded, ephemeral, blob cache with client hashing. Redis is an in-memory data structure server: strings, hashes, lists, sets, zsets, streams, optional durability, and powerful atomic commands. If you only need get/set cache, either works; if you need more than a blob, pick Redis. Do not use Redis LRU cache as your only copy of critical data unless you meant to.

**Key points:**
- Start with use case, not brand loyalty.
- Mention one structure (zset) as the differentiator.
- Mention persistence as optional.
- Mention single-threaded vs multi-threaded honestly.
- Close with 'we split cache vs session instances'.

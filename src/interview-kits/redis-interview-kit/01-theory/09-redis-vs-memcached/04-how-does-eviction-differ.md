# How does eviction differ?

**Definition:**
Memcached is LRU (slab allocator — historically slab pollution was a gotcha). Redis has configurable policies (LRU/LFU/TTL/random/noeviction) and richer key metadata. Slab issues are a classic Memcached interview footnote; Redis fragmentation (`active defrag`) is the analog conversation.

**Key points:**

- Memcached slabs: size classes can waste memory with mixed value sizes.
- Redis maxmemory-policy is explicit.
- Both can evict your hot data if undersized.
- Neither is a database with this conversation.
- Measure hit rate, not just RAM %.

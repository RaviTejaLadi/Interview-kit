# What is LFU eviction?

**Definition:**
LFU (least frequently used) uses an access counter so rarely used keys go first even if they were touched recently once. Policies: `allkeys-lfu`, `volatile-lfu`. Better when a large scan would otherwise 'refresh' LRU and evict true hot keys.

**Key points:**

- Protects hot keys from one-off scans.
- Counters decay over time (configurable).
- Slightly more moving parts than LRU.
- Use when you have known zipf-like key popularity.
- Still an approximation.

# LRU Cache Design

Design a cache with:

- `get(key)` in `O(1)`
- `put(key, value)` in `O(1)`
- Eviction of least recently used item when capacity is full

## Standard interview design

Use:

1. Hash map: `key -> node` for `O(1)` lookup
2. Doubly linked list: maintain usage order (most recent near head, least recent near tail)

## Why this is asked

It tests your ability to combine data structures to satisfy strict complexity constraints.

# How do Redis lists work?

**Definition:**
Lists are linked lists of strings. `LPUSH`/`RPUSH` add, `LPOP`/`RPOP` remove, `LRANGE` reads a range. They implement stacks, queues, and capped logs (`LTRIM`). Blocking pops (`BLPOP`) are a simple worker queue. `LRANGE 0 -1` on a huge list is costly.

**Key points:**

- `LPUSH` + `RPOP` = queue.
- `BRPOP` waits for work.
- Capped timeline: `LPUSH` then `LTRIM key 0 99`.
- Not ideal for middle inserts; that is not O(1).
- For reliable queues with ACKs, prefer Streams.

```bash
LPUSH jobs '{ "type": "resize", "id": 9 }'
BRPOP jobs 5
LTRIM events:user:1 0 99
```

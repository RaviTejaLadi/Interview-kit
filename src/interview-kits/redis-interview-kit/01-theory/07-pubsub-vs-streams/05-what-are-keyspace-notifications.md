# What are keyspace notifications?

**Definition:**
Keyspace notifications (`notify-keyspace-events`) publish events like expired keys or `SET` on a key via pub/sub channels (`__keyevent@0__:expired`). Useful for expiry-driven workflows (session end). They inherit pub/sub delivery: missed events if you were down. Not a reliable job scheduler.

**Key points:**
- Expired-key events are popular and easy to drop.
- Enable only the event classes you need.
- For reliable delayed jobs, use a zset of timestamps or a real scheduler.
- Cluster and replicas complicate who receives events.
- Treat as best-effort hooks.

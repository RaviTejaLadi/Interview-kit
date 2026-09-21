# How does Redis pub/sub work?

**Definition:**
`PUBLISH channel message` sends to current subscribers of that channel (`SUBSCRIBE` / `PSUBSCRIBE`). It is fire-and-forget: if a client is disconnected, the message is gone. There is no history, ACK, or consumer group. It is a real-time fan-out primitive, not a queue.

**Key points:**
- At-most-once delivery to currently connected clients.
- No persistence of messages.
- Good for live notifications, cache invalidation fan-out, presence.
- A slow subscriber can cause issues — know disconnect policies.
- Cluster: pub/sub is broadcast; use with care at huge scale (Sharded Pub/Sub in later Redis).

```bash
SUBSCRIBE cache:invalidate
PUBLISH cache:invalidate user:42
```

# What is AOF persistence?

**Definition:**
AOF (append-only file) logs every write. On restart Redis replays the log to rebuild state. `appendfsync` can be `always` (slow, durable), `everysec` (common default trade-off), or `no`. AOF rewrite compact the log. You lose at most about one second with `everysec` on a crash.

**Key points:**
- `everysec` is the usual production AOF setting.
- `always` fsyncs every command — durable and slow.
- Rewrite prevents unbounded AOF growth.
- Replay of a huge AOF is slower than loading RDB.
- Redis can use RDB preamble in AOF rewrites for faster restart.

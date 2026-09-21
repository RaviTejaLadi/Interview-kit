# How do you persist Redis in this stack if you need it?

**Definition:**
Mount a volume on `/data` and run `redis-server --appendonly yes`. For a pure cache, skip persistence. Do not mix 'I can lose cache' with AOF on the same mental model as Postgres volumes.

**Key points:**
- Cache: no volume is OK.
- Sessions/queues: volume + AOF.
- `appendonly yes` in command or redis.conf.
- Backup story still needed.
- One Redis for cache+sessions with LRU will evict sessions — split services if needed.

```yaml
redis:
  image: redis:7-alpine
  command: ["redis-server", "--appendonly", "yes"]
  volumes:
    - redisdata:/data
```

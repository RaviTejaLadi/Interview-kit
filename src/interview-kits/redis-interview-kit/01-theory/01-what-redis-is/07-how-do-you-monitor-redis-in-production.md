# How do you monitor Redis in production?

**Definition:**
Watch `used_memory`, fragmentation, hit rate, evictions, blocked clients, slowlog, CPU, connected clients, and replication offset. `INFO`, Redis exporter + Prometheus, and `SLOWLOG` are standard. Latency spikes often mean a hot key, `KEYS`, or fork during RDB save.

**Key points:**

- Hit ratio = `keyspace_hits / (hits + misses)`.
- Evictions > 0 means you are over memory with a maxmemory policy.
- Slowlog catches `O(N)` mistakes.
- Fork-based persistence can cause copy-on-write memory spikes.
- Alert on replica lag if you read from replicas.

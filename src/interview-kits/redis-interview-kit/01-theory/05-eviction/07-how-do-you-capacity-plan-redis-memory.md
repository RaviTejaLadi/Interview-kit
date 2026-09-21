# How do you capacity-plan Redis memory?

**Definition:**
Estimate bytes per key (including overhead ~ tens of bytes + value), times working set, times 1.5–2 for fragmentation and failover, plus peak spike. Use `MEMORY STATS` / `MEMORY DOCTOR`. Object encoding (ziplist/listpack) changes size. Load-test with realistic value sizes.

**Key points:**
- Empty Redis still uses memory.
- Replicas need similar RAM.
- RDB fork needs extra RAM under write load (COW).
- Metrics: `used_memory_rss` vs `used_memory`.
- Eviction starting is a capacity signal, not a success metric.

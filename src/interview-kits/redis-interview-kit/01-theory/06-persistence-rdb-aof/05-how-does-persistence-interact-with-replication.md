# How does persistence interact with replication?

**Definition:**
Replicas get a stream of commands (and a snapshot to start). A replica can be durable even if the primary is cache-only, but failover data safety depends on whether writes reached replicas. `WAIT` can wait for replica acknowledgment (synchronous replication lite). Promotion without data is still possible on netsplit — know the risk.

**Key points:**

- Async replication by default → possible data loss on failover.
- `min-replicas-to-write` / `WAIT` trade availability for durability.
- Sentinel/cluster failover is about HA, not magic zero-loss.
- Persistent replica + ephemeral primary is a valid pattern.
- Test restore from backup, not only failover.

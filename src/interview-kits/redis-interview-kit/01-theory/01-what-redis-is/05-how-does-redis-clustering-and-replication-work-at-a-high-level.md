# How does Redis clustering and replication work at a high level?

**Definition:**
Replication is primary → replica for high availability and read scaling (with replica lag). Cluster mode shards keys across 16384 hash slots on many primaries. A key lives in one slot; multi-key commands need the same slot (`{hash_tag}`). Sentinel (non-cluster) automates failover for a single primary.

**Key points:**

- Replica reads can be stale.
- Writes go to the primary for a slot.
- Hash tags `{user:42}:profile` and `{user:42}:posts` colocate keys.
- Cross-slot `MULTI` is not allowed in cluster.
- Client libraries must be cluster-aware.

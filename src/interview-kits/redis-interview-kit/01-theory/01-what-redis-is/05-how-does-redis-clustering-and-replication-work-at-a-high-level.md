# How does Redis clustering and replication work at a high level?

Redis replication and clustering solve different problems.

- Replication: Keeps copies of data on other Redis instances to improve availability and support read scaling.
- Clustering: Distributes data across multiple primary nodes to scale storage and write capacity.

### A. Redis replication

A primary Redis instance handles writes and sends changes to its replicas.

Primary

Handles writes

Replicates changes

Replica 1

Read traffic

Replica 2

Read traffic

Replication is normally asynchronous. A replica may temporarily lag behind the primary, and an acknowledged write can potentially be lost during failover. Replication alone does not guarantee zero data loss.&#x20;

### B. Redis Cluster

Redis Cluster divides the keyspace into 16,384 hash slots. Each primary node owns a subset of those slots, and keys are assigned to slots using a hash function.

Application using a Redis Cluster client

Primary A

Slot range A

Replica A

Primary B

Slot range B

Replica B

Primary C

Slot range C

Replica C

Each primary stores a different part of the keyspace.

When a client sends a command, the cluster routes it to the primary responsible for that key's slot. Replicas can take over through failover if a primary becomes unavailable and the cluster can elect an eligible replica.&#x20;

### Replication vs. clustering

| Feature        | Replication                                               | Redis Cluster                                  |
| -------------- | --------------------------------------------------------- | ---------------------------------------------- |
| Main purpose   | Availability and read scaling                             | Data distribution and scaling                  |
| Data storage   | Copies the primary's dataset                              | Splits data across primaries                   |
| Write handling | Usually through the primary                               | Through the primary owning the key's slot      |
| Failover       | Requires a mechanism such as Sentinel or managed failover | Built-in cluster failover mechanisms           |
| Best fit       | Dataset fits on one primary                               | Dataset or throughput needs multiple primaries |

Interview takeaway: Replication copies data; clustering shards data and also supports replication and failover.

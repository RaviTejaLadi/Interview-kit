# How do you scale Redis messaging?

**Definition:**
Many subscribers on pub/sub can overload Redis (it fans out). Sharded pub/sub, dedicated Redis for messaging, or moving to Kafka/NATS/Redis Streams with many groups are options. Measure `pubsub_channels` and CPU. For streams, partition by key (`userId`) so `XADD` does not hotspot one stream if it grows huge.

**Key points:**
- One giant stream vs many streams per tenant.
- Consumer group parallelism is per stream.
- Offload snapshots to replicas; messaging load stays on writers.
- Backpressure: `BLOCK` reads, cap `MAXLEN`.
- Know when to leave Redis for a broker product.

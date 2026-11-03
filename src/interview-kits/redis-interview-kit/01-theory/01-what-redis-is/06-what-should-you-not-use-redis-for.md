# What should you not use Redis for?

Redis is powerful, but it is not the right tool for every workload.

| Avoid using Redis as the primary solution when…                        | Why                                                                                                               |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| You need complex relational queries and joins                          | A relational database such as PostgreSQL is better suited to these queries.                                       |
| You need large, inexpensive, durable storage                           | Keeping a large working dataset in RAM can be expensive.                                                          |
| You need guaranteed zero data loss                                     | Redis persistence and replication settings require careful configuration; replication is asynchronous by default. |
| You need full-text search and complex analytics                        | A specialized search engine or analytical database may be a better fit.                                           |
| You need a durable job queue without understanding delivery guarantees | Redis-based queues require appropriate persistence, retry, acknowledgment, and recovery strategies.               |

### Important distinction: Redis can persist data

Redis supports RDB snapshots and Append Only File (AOF) persistence. These options help recover data after a restart, but they have different durability and performance trade-offs.

For example, a Redis cache can usually tolerate missing data because the application can reload it from the database. An order-processing system cannot casually assume that a payment or order record can be reconstructed.

A good rule: Use Redis for low-latency data access and workloads that fit its data model. Keep the authoritative copy of critical business records in a durable database unless your architecture explicitly accounts for Redis durability and recovery requirements.

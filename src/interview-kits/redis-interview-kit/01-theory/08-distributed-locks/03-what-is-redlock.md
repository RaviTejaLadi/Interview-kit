# What is Redlock?

**Definition:**
Redlock (Antirez) acquires the lock on a majority of independent Redis masters with the same token and a short TTL, accounting for clock skew. It aims to be safer than a single instance. It is controversial (see Martin Kleppmann's critique): pauses, GC, and clock issues can still break mutual exclusion. Many teams use a single Redis lock plus idempotent work instead.

**Key points:**

- Majority of N independent nodes.
- Not the same as Redis Cluster replicas.
- Know it exists; know the criticism.
- For strong fencing, use a fencing token the resource checks (ZooKeeper/etcd/SQL).
- Interview gold: 'Redis lock ≠ linearizable mutex for safety-critical correctness'.

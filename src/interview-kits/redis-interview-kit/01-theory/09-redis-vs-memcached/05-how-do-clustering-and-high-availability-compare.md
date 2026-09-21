# How do clustering and high availability compare?

**Definition:**
Memcached clusters are usually client consistent hashing; a node death dumps that shard's cache (acceptable). Redis Cluster/Sentinel offer replication and failover for the data. That is a feature if you store sessions you do not want to drop, and extra complexity if you only cache HTML.

**Key points:**
- Cache miss storm after Memcached node loss is expected.
- Redis failover can preserve data if replicated.
- Client libraries differ (cluster-aware Redis vs ketama Memcached).
- HA for a cache is optional; HA for locks/sessions is not.
- Operational cost belongs in the decision.

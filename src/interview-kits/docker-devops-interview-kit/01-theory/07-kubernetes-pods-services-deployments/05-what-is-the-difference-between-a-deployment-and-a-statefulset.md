# What is the difference between a Deployment and a StatefulSet?

**Definition:**
Deployments: interchangeable replicas, no stable names, storage via shared or none. StatefulSets: stable network identity (`redis-0`), ordered start/stop, persistent volume per ordinal. Use StatefulSet for clustered software that needs identity (some databases). Managed cloud DBs often beat self-hosted StatefulSets.

**Key points:**

- Ordinals and stable PVC.
- Rolling update strategy is more careful (often one at a time).
- Not a magic HA database.
- Headless service for DNS `redis-0.redis`.
- Stateless API: Deployment. Always.

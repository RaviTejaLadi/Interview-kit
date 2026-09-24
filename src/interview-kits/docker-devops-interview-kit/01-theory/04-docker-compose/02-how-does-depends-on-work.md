# How does depends_on work?

**Definition:**
By default `depends_on` only waits for start, not readiness. Postgres can accept connections later. Use healthchecks and `depends_on.condition: service_healthy` (Compose v2) so the API starts after Postgres is actually up. In Kubernetes, this is probes + retry, not depends_on.

**Key points:**

- Start order ≠ ready order.
- Apps should still retry connections.
- Healthcheck for Postgres: `pg_isready`.
- Circular depends_on is a smell.
- Init containers in K8s are the analog for migrate-then-start.

```yaml
depends_on:
  postgres:
    condition: service_healthy
  redis:
    condition: service_healthy
```

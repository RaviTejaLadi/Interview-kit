# How should you persist a Postgres database in Docker?

**Definition:**
Mount a named volume on the Postgres data dir. Pin the Postgres major version. Do not put the data directory in the image. Back up with `pg_dump` or volume snapshots, not by copying files from a running dirty volume without a consistent backup method.

**Key points:**
- Volume on `/var/lib/postgresql/data`.
- Same major version for upgrades or use dump/restore.
- One writer; replicas are a separate design.
- Compose is not HA Postgres.
- Credentials via env or secrets, not baked into the image.

```yaml
services:
  postgres:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
volumes:
  pgdata:
```

# How do you restore Redis from persistence?

**Definition:**
Place `dump.rdb` and/or `appendonly.aof` in the data dir and start Redis (config must enable AOF to load it). Prefer restoring a verified backup to a new instance and switching traffic. Never `FLUSHALL` in panic without a snapshot. Practice restores.

**Key points:**
- Backups are useless until restored once.
- Check `dir` and filenames in redis.conf.
- Version compatibility of RDB files matters.
- Cluster restore is more involved (slots, multiple nodes).
- Document the runbook before the incident.

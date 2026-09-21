# How do you choose RDB vs AOF vs both vs none?

**Definition:**
Cache-only: often no persistence (or RDB rarely) — data is rebuildable. Session/queue/primary: AOF `everysec` plus periodic RDB backups. Both enabled is common (hybrid). None + `allkeys-lru` is a pure cache. Durability is a business question: 'what is lost on power fail?'

**Key points:**
- Rebuildable cache → persistence optional.
- Job queues → persist or use a real queue with disk.
- Meet RPO (recovery point objective) with fsync policy.
- RTO (recovery time) favors RDB load vs long AOF replay.
- Back up RDB/AOF off-box; disk on the same VM is not a backup.

> 💡 Interview formula: RDB = snapshot, AOF = journal, everysec ≈ 1s RPO.

# What is RDB persistence?

**Definition:**
RDB snapshots the dataset to a compact binary file on a schedule (`save 60 1000`) or on `BGSAVE`. Redis forks a child to write the snapshot. Recovery is fast (load one file). You can lose minutes of data since the last snapshot. Fork copy-on-write can hurt memory and latency.

**Key points:**
- Point-in-time backup / compact dumps.
- Good for disaster recovery copies.
- Not enough if you cannot lose the last N minutes.
- Disable RDB on pure caches if you do not want forks — still set maxmemory.
- `SAVE` (blocking) is for emergencies, not production traffic.

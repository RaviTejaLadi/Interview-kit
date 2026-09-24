# What is the fork / copy-on-write problem?

**Definition:**
`BGSAVE` and AOF rewrite fork a child. If the parent keeps writing, the OS copies dirty pages (copy-on-write). Under heavy write load, RSS can nearly double and latency spikes. This has caused production incidents. Mitigations: replica offload of snapshots, diskless replication, or Redis versions/settings that reduce impact.

**Key points:**

- Take snapshots on a replica, not the primary, when possible.
- Watch latency during `bgsave`.
- Size RAM with COW headroom.
- Huge write rate + small `save` intervals = pain.
- Pure cache often disables save to avoid forks.

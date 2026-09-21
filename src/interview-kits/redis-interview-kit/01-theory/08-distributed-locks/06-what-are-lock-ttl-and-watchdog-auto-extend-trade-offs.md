# What are lock TTL and watchdog (auto-extend) trade-offs?

**Definition:**
Short TTL recovers from crashes quickly but risks expiry during slow work. Long TTL delays recovery if a process dies. Watchdogs (`Redisson` extend) refresh TTL while the owner is alive; if the process pauses (GC, laptop sleep), they can extend a dead logical owner. Prefer short critical sections and idempotent jobs.

**Key points:**
- Keep critical sections tiny.
- Do I/O outside the lock when possible.
- Heartbeat extend is operationally nice and theoretically subtle.
- Cron: lock with TTL > period + jitter.
- Never hold a lock while waiting on a user.

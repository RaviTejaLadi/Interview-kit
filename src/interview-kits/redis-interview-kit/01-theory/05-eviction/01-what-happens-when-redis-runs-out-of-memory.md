# What happens when Redis runs out of memory?

**Definition:**
If `maxmemory` is set, Redis evicts keys according to `maxmemory-policy`. If policy is `noeviction` (default in some configs), write commands that consume memory return errors (`OOM`). Reads still work. Without `maxmemory`, Redis grows until the OS OOM-kills it — worse.

**Key points:**

- Always set `maxmemory` in production.
- Leave headroom for fragmentation, replicas, and fork COW.
- Monitor evicted_keys and OOM errors.
- Clients must handle write failures.
- A cache should usually evict, not OOM.

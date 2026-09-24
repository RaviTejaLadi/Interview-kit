# When should you use Redis hashes?

**Definition:**
Hashes map field → value inside one key (`HSET user:1 name Ada`). They are good for objects you partially update. `HGETALL` is `O(N)` in fields — fine for small objects, dangerous for unbounded field counts. Prefer hashes over encoding JSON when you often update one field.

**Key points:**

- `HINCRBY` for per-field counters.
- Memory can be more efficient than many tiny string keys.
- Cluster: the whole hash is one key / one slot.
- Do not store millions of fields in one hash without a plan.
- `HMGET` for a subset of fields.

```bash
HSET user:1 name Ada email ada@example.com
HGET user:1 name
HINCRBY user:1 loginCount 1
```

# Should you update the cache or delete the key on write?

**Definition:**
Deleting (`DEL`) is safer than updating: the next read rebuilds from DB, so you cannot write a wrong shape. Updating (`SET`) avoids a miss but races if two writers compute different values. Many teams invalidate on write and accept a miss. For high-read keys, update only if the write path has the canonical new row.

**Key points:**

- Invalidate-on-write is the default recommendation.
- Read-repair vs write-update races: last writer wins may be wrong without versioning.
- Version numbers / `updatedAt` in the payload help.
- Delayed invalidation + TTL is belt and suspenders.
- Never only update cache and skip DB in cache-aside.

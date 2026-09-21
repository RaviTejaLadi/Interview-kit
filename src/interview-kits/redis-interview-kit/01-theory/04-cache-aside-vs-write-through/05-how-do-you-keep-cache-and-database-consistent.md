# How do you keep cache and database consistent?

**Definition:**
You cannot get perfect consistency with an independent Redis without transactions spanning both. Practical approach: DB is source of truth, short TTLs, invalidate on write, optional pub/sub to other instances, and accept brief staleness. For stronger needs, read-through with versions or skip cache for that read.

**Key points:**
- Define an acceptable staleness SLO.
- Order: write DB, then invalidate cache (classic). Still a window of stale reads.
- The opposite order can serve deleted data after DB write failure.
- Distributed transactions (2PC) are usually overkill.
- Idempotent rebuilds make retries safe.

> 💡 Be honest: cache-aside is eventually consistent. Quantify TTL.

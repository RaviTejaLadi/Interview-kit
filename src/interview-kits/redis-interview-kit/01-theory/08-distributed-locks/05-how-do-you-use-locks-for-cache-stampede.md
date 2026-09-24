# How do you use locks for cache stampede?

**Definition:**
On cache miss, try `SET lock:article:1 NX EX 5`. Winner loads DB and fills cache. Losers wait/retry GET or serve stale. This single-flights the expensive rebuild. TTL on the lock must cover DB time. See also probabilistic early expiration.

**Key points:**

- Lock key separate from data key.
- Losers should not all hit DB after timeout — backoff.
- Stale-while-revalidate: serve old cache while one refreshes.
- Local singleflight (`p-limit`) still helps one process.
- Hot miss keys need this most.

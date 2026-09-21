# How do you cache database query results vs objects?

**Definition:**
Object cache: `user:42` → JSON of user. Query cache: hash the SQL + params → list of ids, then fetch objects. Query caches are fragile (any write may invalidate many keys). Prefer object caching + assembling in the app, or cache the exact rendered response for a page.

**Key points:**
- Key design is the whole problem.
- Query-result keys must include tenant id.
- Invalidate by scanning prefixes is expensive — avoid if you can.
- Normalized cache (ids) + MGET objects is a solid pattern.
- GraphQL persisted queries pair well with response caches.

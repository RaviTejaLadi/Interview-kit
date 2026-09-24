# What should you not use Redis for?

**Definition:**
Unbounded datasets larger than RAM, ad-hoc analytics (no SQL joins), strongly consistent multi-record business transactions across many keys without careful Lua/MULTI design, and storing the only copy of irreplaceable data without a persistence and backup story. Redis is a sharp tool, not a Postgres replacement by default.

**Key points:**

- Working set must fit memory (plus overhead).
- No relational joins or ad-hoc GROUP BY like SQL.
- Durability is configurable — know RDB/AOF trade-offs before treating it as source of truth.
- Huge keys (multi-GB hashes) hurt everyone on the instance.
- Cold data belongs in a database or object storage.

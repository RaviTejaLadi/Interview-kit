# When should you not use a Redis lock?

**Definition:**
When you need strict correctness under pauses (money transfers without idempotency), when a single Redis is not trusted, or when the database transaction already serializes the rows (`SELECT FOR UPDATE`). Locks that span many seconds of external HTTP are fragile. Prefer unique constraints + retries.

**Key points:**

- DB unique index is a better 'lock' for creating a user email.
- Payment providers' idempotency keys beat a home-grown mutex.
- ZooKeeper/etcd if you already run them for this purpose.
- If lock failure means 'skip this optional cache fill', Redis is perfect.
- If lock failure means 'corrupt ledger', redesign.

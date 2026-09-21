# What is write-behind (write-back)?

**Definition:**
Writes hit the cache first and are flushed to the database asynchronously. This is the lowest write latency and the highest risk: crash before flush loses data. Rare in typical web apps; more common in specialized systems. Interviewers want you to know it exists and why it is dangerous.

**Key points:**
- Fast writes, delayed durability.
- Need a queue of dirty keys and retry.
- Not the default for financial data.
- Redis persistence does not replace the DB flush.
- Prefer cache-aside unless you have a strong reason.

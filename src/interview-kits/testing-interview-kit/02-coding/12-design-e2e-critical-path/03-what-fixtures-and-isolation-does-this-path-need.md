# What fixtures and isolation does this path need?

**Definition:**
Fresh product inventory so stock cannot hit 0 from parallel workers. Isolated user. Reset cart. Stub emails. Deterministic payment. Environment URL from env (`PLAYWRIGHT_BASE_URL`). Workers get partitions (port, database schema, or tenant id).

**Key points:**

- Worker-index in seed data.
- Never share one credit card nonce unsafely — use test mode.
- Cleanup or use ephemeral envs.
- Feature flags: force the path on in test.
- Document required seed.

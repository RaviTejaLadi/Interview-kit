# Is retrying a test in CI a valid fix?

**Definition:**
Retries are a mitigation for remaining environmental flakes, not a fix for races in product code. Retrying a race can hide a real bug that also happens in prod. Use retries sparingly (Playwright `retries: 1` on E2E) and always investigate first-failure artifacts. Never retry unit tests as a policy.

**Key points:**

- Unit tests should be retry-free.
- E2E: 1 retry + trace is a compromise.
- If a test needs 3 retries, it is broken.
- Quarantine with a ticket and owner.
- Do not `it.skip` forever.

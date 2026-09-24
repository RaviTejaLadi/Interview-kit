# How does shared state make tests flaky?

**Definition:**
Tests that depend on execution order, a singleton cache, a real clock, or a DB row another test deleted will fail in parallel CI. Isolation: fresh data per test, transactional rollback, `beforeEach` reset, no dependence on previous cases. Jest workers are parallel by file — global mocks leak within a file if not restored.

**Key points:**

- `afterEach` restore mocks.
- Unique emails `user+${uuid}@mail.test`.
- Never `TRUNCATE` in one test while another runs on the same DB without isolation.
- Order-dependent tests fail under `--random`.
- Reset modules (`resetModules`) when mocking imports — carefully.

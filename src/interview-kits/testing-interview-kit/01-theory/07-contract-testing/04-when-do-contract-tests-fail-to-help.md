# When do contract tests fail to help?

**Definition:**
When contracts only assert `status 200` without body shape, when producer verification uses totally different data than production, when you never run `can-i-deploy`, or when the real bugs are performance/authz/time. Contracts are schema/interaction, not load tests or UX.

**Key points:**

- Weak matchers hide changes.
- Missing provider states → false greens.
- Frontend still needs RTL for rendering.
- Auth and tenancy bugs need dedicated tests.
- Do not replace monitoring.

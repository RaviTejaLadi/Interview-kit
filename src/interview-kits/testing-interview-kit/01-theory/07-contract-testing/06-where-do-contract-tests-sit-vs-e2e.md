# Where do contract tests sit vs E2E?

**Definition:**
Contracts give fast, isolated compatibility. E2E gives 'the deployed graph works with cookies and the real UI'. Use contracts on every PR between services; use E2E on critical paths in staging. If you only have E2E across 12 services, PR CI will be hell — add contracts.

**Key points:**

- PR: contract + unit.
- Staging: smoke E2E.
- Owner: each consumer owns its contract.
- Broker visibility for who uses what.
- This is how microservices stay testable.

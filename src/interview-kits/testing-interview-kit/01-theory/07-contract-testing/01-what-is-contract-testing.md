# What is contract testing?

**Definition:**
Contract testing verifies that a provider (API) and a consumer (UI or another service) agree on a schema and examples — without always running both in one process. Consumer-driven contracts (Pact) record what the consumer needs; the provider replays those interactions. Schema-first (OpenAPI) tests both against the spec.

**Key points:**
- Catches breaking API changes in CI.
- Cheaper than full cross-service E2E.
- Does not replace business logic tests.
- Needs a broker or artifact store for Pact.
- Version and evolve contracts like APIs.

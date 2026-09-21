# How do mocks go stale against real APIs?

**Definition:**
A stubbed JSON shape drifts from the real API. Your UI tests pass; production crashes on `undefined`. Mitigate with contract tests, MSW handlers generated from OpenAPI, periodic integration against a sandbox, and consumer-driven contracts. Recorded fixtures need refresh jobs.

**Key points:**
- Fixture rot is inevitable without a process.
- Pact breaks the producer CI if they change the shape.
- TypeScript types help only if they are generated from the source of truth.
- Do not copy production payloads once and never again.
- Version your fixtures.

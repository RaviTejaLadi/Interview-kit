# How does OpenAPI-based contract testing work?

**Definition:**
Generate types and validators from OpenAPI. In CI, assert responses match the schema (Dredd, schemathesis, spectree). Consumers generate clients from the same spec. Breaking the spec fails CI. This is provider-first; consumers still need to not ignore new errors.

**Key points:**

- Spec is the source of truth.
- Runtime validation in prod is extra safety.
- Keep spec and implementation from drifting (codegen or tests).
- GraphQL analog: schema tests + persisted operations.
- Combine with example payloads.

# Where do API/contract tests fit?

**Definition:**
API tests hit HTTP handlers with a test DB or fakes; contract tests (Pact) check producer/consumer schemas. They sit in the integration band. They catch breaking JSON changes cheaper than UI E2E. Public APIs should have this layer.

**Key points:**
- Supertest / HTTP integration tests.
- Pact/OpenAPI schema tests.
- Cheaper than Selenium for backend regressions.
- Does not prove the button is wired.
- Combine with a few E2E for the UI.

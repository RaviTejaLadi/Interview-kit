# Should integration tests use mocks?

**Definition:**
If everything is mocked, it is a unit test of the orchestrator, not an integration test. Mock at the far boundary (third-party HTTP) and keep your DB/real modules. Over-mocking creates green tests that miss SQL errors. Under-mocking makes tests slow and flaky.

**Key points:**
- Mock I/O you do not own.
- Do not mock the system under test.
- In-memory SQLite vs real Postgres: dialect differences are a risk.
- Clock and random still faked for determinism.
- Name tests honestly.

> 💡 If your 'integration' test mocks the database, it is not testing integration with the database.

# Why is mocking the database in a repository test often useless?

**Definition:**
If the repository's job is SQL, mocking `db.query` only tests string concatenation. You will not catch a wrong JOIN or missing index assumption. Use a test database (Testcontainers) or at least a real query against SQLite if dialects match. Mock the repository when testing a service above it.

**Key points:**
- Mock at the layer above the SQL, or run SQL.
- Testcontainers Postgres in CI is common now.
- Transactional tests for isolation.
- Schema migrations applied in setup.
- The service test can use a fake repo; the repo test should not.

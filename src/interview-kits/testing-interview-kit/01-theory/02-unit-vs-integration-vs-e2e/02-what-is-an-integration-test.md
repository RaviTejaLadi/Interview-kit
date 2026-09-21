# What is an integration test?

**Definition:**
An integration test verifies that multiple real parts work together: handler + database, React + router, module A + module B. Boundaries are wider than a unit. They catch wiring bugs (wrong SQL, wrong status codes) that mocks hide. They are slower and need more setup (containers, migrations).

**Key points:**
- Use a real test Postgres when the SQL is the risk.
- Use MSW when the risk is HTTP adapter mapping.
- Still avoid hitting production APIs.
- Transactional rollback or unique schema per test for isolation.
- The line vs unit tests is blurry — say what you integrate.

# What are common causes of flakes in UI tests?

**Definition:**
Fixed `sleep` that is too short on a slow CI runner, animations, waiting for the wrong element, shared user accounts, parallel tests colliding on data, `localhost` timing, font/icon load, and third-party scripts. Playwright traces help. Prefer `expect` auto-wait over sleeps.

**Key points:**

- `waitForSelector` / web-first assertions.
- Disable animations in test env.
- Unique seed data per worker.
- Trace on first retry.
- Isolate third parties via route mocks.

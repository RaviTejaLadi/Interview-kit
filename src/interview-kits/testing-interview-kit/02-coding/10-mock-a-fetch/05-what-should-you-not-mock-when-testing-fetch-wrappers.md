# What should you not mock when testing fetch wrappers?

**Definition:**
Do not mock `JSON.parse`, `URL`, or the wrapper's internal helpers that are trivial. Do not mock `fetch` in a Playwright test that is supposed to hit your API (unless you intentionally isolate a third party). Do not leave fetch mocked for later tests.

**Key points:**
- Restore globals.
- Inject `fetchImpl` to avoid global mock leakage.
- Contract-test the real handler separately.
- If you mock fetch and the router, you are not testing much.
- Prefer injection for unit tests — easier than `jest.mock('node-fetch')` wars.

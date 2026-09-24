# When should you mock fetch or HTTP?

**Definition:**
Unit-test a function that maps HTTP JSON to a domain model by stubbing `fetch`. Component-test UI with MSW so you do not stub React internals. Integration-test your API with a real server and fake only the third party. Never mock `fetch` inside a true E2E browser test unless you intend to (Playwright route interception is a conscious choice).

**Key points:**

- MSW: intercept at network, keep app code real.
- `jest.spyOn(global, 'fetch')` is fine in a small client unit test.
- Do not mock Axios internals five layers down if you can fake the server.
- Record/replay (Polly) for stubborn third parties.
- Reset handlers between tests.

# How do you test async UI (loading, fetch)?

**Definition:**
Use `findBy` / `waitFor` instead of fixed sleeps. Mock network with MSW or a stubbed client. Assert loading state then success/error. `userEvent` is async — always `await`. Fake timers if you must test debounce, then `advanceTimers`.

**Key points:**
- `waitFor` retries assertions.
- MSW `server.use` for error cases per test.
- Avoid `act` warnings by awaiting UI.
- Do not assert on internal `isLoading` state — assert spinner role/text.
- Cleanup pending timers.

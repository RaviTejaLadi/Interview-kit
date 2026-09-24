# Where do component tests fit in the pyramid?

**Definition:**
Component tests (React Testing Library, Vue Test Utils, Playwright component mode) sit between unit and E2E: they render UI with fake or real-ish network, no full browser stack of the whole app. They catch accessibility roles, click handlers, and state — cheaper than E2E, richer than a pure function test.

**Key points:**

- RTL: test from the user's point of view.
- Not a replacement for unit-testing a pricing function.
- Not a replacement for one true checkout E2E.
- MSW (Mock Service Worker) often pairs here.
- Count them as 'UI integration' on the pyramid.

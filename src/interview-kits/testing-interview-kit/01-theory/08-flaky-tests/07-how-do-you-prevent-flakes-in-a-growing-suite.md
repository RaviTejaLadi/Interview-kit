# How do you prevent flakes in a growing suite?

**Definition:**
Ban sleeps in review, unique data, test owners, flake dashboards, fail the build on new flakes, keep E2E few, prefer RTL, fake time, isolate DBs, and run tests on PRs that touch the area. Teach `waitFor` patterns. Delete tests that cost more than they save.

**Key points:**
- Lint for `setTimeout` in tests if you can.
- Budget: max E2E count.
- Hermetic CI containers.
- Contract tests reduce giant E2E.
- Culture: flakes are P0 for the team that owns them.

> 💡 A suite the team ignores is worse than a smaller honest suite.

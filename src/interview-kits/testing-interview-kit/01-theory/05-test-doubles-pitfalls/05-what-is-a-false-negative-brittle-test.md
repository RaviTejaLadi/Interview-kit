# What is a false negative / brittle test?

**Definition:**
A test that fails when behavior is still correct: timezone-dependent strings, exact error wording, animation timing, CSS class hashes, list order that is not guaranteed. Brittle tests train the team to ignore CI. Stabilize time, use regex/roles, wait for conditions not sleeps.

**Key points:**

- Fake timers vs real timers — pick deliberately.
- `waitFor` instead of `sleep(1000)`.
- Do not assert full inline snapshots of entire Redux stores unless you mean to.
- Locale/timezone in CI must be pinned.
- Quarantine is a last resort, not a strategy.

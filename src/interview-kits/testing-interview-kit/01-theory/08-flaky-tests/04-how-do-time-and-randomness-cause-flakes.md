# How do time and randomness cause flakes?

**Definition:**
`new Date()` and `Math.random()` differ between runs. Snapshots of timestamps fail. Token expiry tests depend on wall clock. Fix: inject a clock, `jest.useFakeTimers()`, seed RNG, or assert on relative behavior. Timezone differences between laptops and CI (UTC vs local) are infamous.

**Key points:**
- Pin `TZ=UTC` in CI.
- Fake timers and `advanceTimersByTime`.
- Do not mix fake timers with user-event without docs.
- Snapshot dates with a stable formatter and frozen clock.
- Cron tests: control `Date` in the domain.

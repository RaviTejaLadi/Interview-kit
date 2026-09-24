# How do you debug a flake that only fails in CI?

**Definition:**
Reproduce with CI-like constraints (slow CPU, TZ=UTC, parallel workers, headless). Collect traces, screenshots, logs, SQL. Run the test 100 times locally (`--repeat-each`). Shrink the test. Check pollution from another file. Compare env vars and versions. Record a video on failure.

**Key points:**

- `npx playwright test --repeat-each=50`.
- Jest `--runInBand` vs parallel to see races.
- Dump `process.env` diffs.
- Resource starvation OOM in CI is not a flake — it is infra.
- Binary search commits if it recently started.

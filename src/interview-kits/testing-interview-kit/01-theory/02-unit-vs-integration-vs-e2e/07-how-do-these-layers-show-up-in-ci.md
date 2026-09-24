# How do these layers show up in CI?

**Definition:**
PR: lint + unit + fast integration. Nightly or main: E2E. Parallelize by shard. Fail fast on unit. Cache node_modules and browsers. Report flakes separately from real failures. Required checks should not include a known-flaky E2E without quarantine.

**Key points:**

- Minutes for PR, longer for nightly.
- Shard Playwright by spec file.
- Keep unit tests runnable offline.
- Do not block PRs on third-party sandbox outages — isolate those tests.
- Artifacts: screenshots, traces, junit XML.

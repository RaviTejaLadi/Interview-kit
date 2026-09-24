# What was Enzyme and why did teams move away?

**Definition:**
Enzyme (Airbnb) rendered components and let you `shallow` render, `wrapper.setState`, and inspect internals. Shallow rendering skipped children, so tests passed while integration was broken. It lagged React versions (hooks, concurrent features). RTL became the recommended approach in the React docs.

**Key points:**

- Shallow: fast but false confidence.
- `wrapper.state()` couples to implementation.
- Maintenance: adapters per React version.
- Still appears in legacy codebases — know migration: rewrite tests to RTL, do not wrap Enzyme forever.
- Interview: be respectful of history, clear on the present.

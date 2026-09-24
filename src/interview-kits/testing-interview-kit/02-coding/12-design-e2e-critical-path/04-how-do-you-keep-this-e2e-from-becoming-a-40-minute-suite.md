# How do you keep this E2E from becoming a 40-minute suite?

**Definition:**
One checkout test, not 15 card-brand variants (those are unit/integration of the payment mapper). Parallelize by file. Skip login UI if a helper sets a cookie and login has its own test. Run on PR against preview env, not 12 browsers unless you need them. Nightly: extra browsers.

**Key points:**

- Variants belong lower in the pyramid.
- Cookie/session helper.
- Shard on CI.
- PR: Chromium only; nightly: Firefox/WebKit.
- Delete tests that duplicate RTL.

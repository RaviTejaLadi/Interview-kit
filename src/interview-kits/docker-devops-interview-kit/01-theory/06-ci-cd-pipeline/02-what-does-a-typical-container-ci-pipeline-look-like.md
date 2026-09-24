# What does a typical container CI pipeline look like?

**Definition:**
On PR: lint, test, build image (maybe not push). On main: test, build, scan, push digest, deploy staging, smoke test, deploy prod (canary/rolling). Cache Docker layers. Fail on high CVEs and test failures. Migrations as a Job before or during deploy with a lock.

**Key points:**

- Build once; promote the same digest.
- Do not rebuild different images per environment if config can be env/runtime.
- Tag with git sha and also `sha256` digest.
- OIDC to cloud registries beats long-lived access keys.
- Required status checks on PRs.

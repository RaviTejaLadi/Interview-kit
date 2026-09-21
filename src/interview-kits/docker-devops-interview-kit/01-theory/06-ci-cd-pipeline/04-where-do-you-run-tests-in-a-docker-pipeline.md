# Where do you run tests in a Docker pipeline?

**Definition:**
Unit tests can run on the CI runner or in a `test` image stage. Integration tests use Compose (api + postgres + redis) or ephemeral K8s (kind). E2E against staging. Do not require production to test basic logic. Cache test layers but do not publish test images as the app.

**Key points:**
- Test stage in the Dockerfile for hermetic unit tests.
- Compose in CI for integration.
- Contract tests on PRs.
- Flakes need isolation and retries with care.
- Keep unit tests out of the runtime image.

# How do you apply the pyramid in a microservices org?

**Definition:**
Each service owns a pyramid. Cross-service E2E are expensive and owned by nobody — prefer contract tests plus a small staging smoke. The 'testing honeycomb' (Spotify) emphasizes integration tests when units are trivial wrappers. Adjust the shape to the architecture, keep the principle: cheaper tests for most logic.

**Key points:**

- Do not require a full-environment E2E for every PR.
- Consumer-driven contracts between services.
- Test doubles at service boundaries, real DB inside the service if you can.
- Observability is not a substitute for tests.
- Pipeline time is a product constraint.

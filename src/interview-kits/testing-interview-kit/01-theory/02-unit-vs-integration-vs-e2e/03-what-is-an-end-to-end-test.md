# What is an end-to-end test?

**Definition:**
An E2E test drives the system as a user or external client would: browser (Playwright/Cypress) or real HTTP against a deployed (or docker-compose) stack. It builds confidence that the pieces were deployed and wired. It is slow, environment-dependent, and should cover critical paths only.

**Key points:**

- Login → search → add to cart → checkout is a classic path.
- Needs seed data and stable test accounts.
- Flakes from timing, animation, third parties.
- Stub third-party payments at the boundary or use sandbox.
- Not the place to test 50 validation messages.

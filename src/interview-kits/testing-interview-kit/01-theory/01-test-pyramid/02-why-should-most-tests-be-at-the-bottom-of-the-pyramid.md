# Why should most tests be at the bottom of the pyramid?

**Definition:**
Unit tests give precise failure messages, run in milliseconds, and do not require browsers or docker compose. They let you refactor with confidence. If the only test is a 40-minute Cypress suite, you will stop running it and ship blind. Push business rules down into pure functions you can unit-test.

**Key points:**
- Feedback in seconds vs minutes.
- Failures point at one function, not 'the checkout flow'.
- E2E still needed for wiring, but not for every branch of a parser.
- CI cost scales with E2E count.
- Design code to be unit-testable (pure core, thin adapters).

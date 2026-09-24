# What is the ice-cream cone anti-pattern?

**Definition:**
The ice-cream cone is many slow UI tests and almost no unit/integration tests. It happens when teams only test through the browser. Result: slow CI, flakes, fear of change, and still missing edge cases that are hard to click. Invert it by extracting logic and adding lower-level tests.

**Key points:**

- Caused by untestable UI-coupled logic.
- QA-only automation without developer unit tests.
- Fixes: test pyramid + RTL for components + API tests.
- Deleting E2E without adding unit tests is not a fix.
- Keep a few critical-path E2E.

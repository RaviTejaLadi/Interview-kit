# What is the test pyramid?

**Definition:**
The test pyramid (Mike Cohn) says you should have many fast, narrow unit tests at the base, fewer integration tests in the middle, and a small number of end-to-end UI tests at the top. Cost, speed, and brittleness increase as you go up. It is a resource-allocation model, not a law of physics.

**Key points:**
- Unit: fast, isolated, cheap to write and run.
- Integration: modules + real collaborators (DB, HTTP) in a controlled env.
- E2E: full stack through the UI or real HTTP; slow and flaky if overused.
- The inverted pyramid (too many E2E, few units) is a common failure mode.
- Some teams draw a trophy/diamond (more integration, fewer pure units) for service-heavy systems — explain why.

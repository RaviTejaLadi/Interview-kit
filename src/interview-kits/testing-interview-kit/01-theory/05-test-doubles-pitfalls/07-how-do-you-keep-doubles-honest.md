# How do you keep doubles honest?

**Definition:**
Share types between real and fake, generate MSW from OpenAPI, run a small integration suite against the real collaborator on main, and use contract tests. Code review: 'what would still pass if we deleted the production code?' If the answer is 'everything', the suite is dishonest.

**Key points:**

- Interface + fake implementing it.
- One integration test as a canary for the fake.
- Avoid `as any` on mock return values.
- Mutation testing for money paths.
- Delete tests that only exist to raise coverage.

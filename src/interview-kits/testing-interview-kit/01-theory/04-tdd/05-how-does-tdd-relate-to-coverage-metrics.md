# How does TDD relate to coverage metrics?

**Definition:**
TDD often yields high coverage of behavior, but 100% coverage is not the goal. Coverage tells you what was not run, not what was asserted. You can cover a line without testing its correctness. Use coverage to find untested branches, not as a vanity gate at 100%.

**Key points:**
- Mutation testing (Stryker) checks if tests actually fail on bugs.
- Coverage of dead error paths may still be missing.
- Do not game coverage with tautological tests.
- Critical money paths: coverage + mutation + E2E.
- A TDD codebase can still miss concurrency bugs.

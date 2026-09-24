# What is the red-green-refactor cycle in practice?

**Definition:**
Red: a test that fails for the right reason (not a typo). Green: simplest implementation, even ugly. Refactor: names, duplication, design, still green. If you refactor on red, you cannot tell breakage from incomplete work. Commit after green if that is your team's style.

**Key points:**

- Watch the test fail once — proves the test is wired.
- Avoid writing extra production code 'while you are there' on red.
- Refactor tests too (readability) on green.
- Tiny steps keep you from debugging two things at once.
- Ping-pong pair programming uses this cycle.

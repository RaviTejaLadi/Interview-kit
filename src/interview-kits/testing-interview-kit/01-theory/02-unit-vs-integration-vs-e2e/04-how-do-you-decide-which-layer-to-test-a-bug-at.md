# How do you decide which layer to test a bug at?

**Definition:**
If the bug is a formula, write a unit test. If it is SQL/JOIN, integration. If it is 'button does not call API' or CSS overlay blocking click, component or E2E. Regression tests should sit at the lowest layer that would have caught the bug. Avoid only adding a 2-minute E2E for a one-line pure function.

**Key points:**
- Lowest reliable layer.
- Reproduce first, then automate at that layer.
- Some bugs only appear in the browser — that is a valid E2E.
- Duplicate coverage is OK briefly; delete the slow one later.
- Ask: what would give the fastest red on this regression?

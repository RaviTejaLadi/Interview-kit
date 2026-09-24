# What is a characterization test?

**Definition:**
When you inherit untested code, write tests that lock current behavior (even weird behavior) before refactoring. These are not TDD of new features; they are a safety harness. Then you can refactor and later change behavior with intentional test updates.

**Key points:**

- Golden master / snapshot of outputs.
- Useful for legacy.
- Do not confuse with approving wrong product behavior forever.
- Approval tests (ApprovalTests lib) are a variant.
- Once characterized, you can TDD new changes.

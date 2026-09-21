# What are common TDD mistakes?

**Definition:**
Testing implementation details (private methods, React internals), huge red steps, skipping refactor, writing tests that only restate the code (`expect(fn).toBeInstanceOf(Function)`), and coupling to mocks so any refactor breaks tests without a behavior change. Another mistake: TDD only controllers and never the domain.

**Key points:**
- If every refactor breaks tests, you tested methods, not behavior.
- Public API assertions survive refactors.
- Keep the cycle small.
- Delete tests that no longer specify useful behavior.
- Pair to learn the rhythm faster.

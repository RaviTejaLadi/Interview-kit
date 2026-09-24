# What is the difference between a stub and a mock?

**Definition:**
A stub provides answers (`fetchUser` returns `{ id: 1 }`). A mock asserts behavior (`expect(repo.save).toHaveBeenCalledWith(...)`). Mocks can make tests brittle if they lock onto incidental calls. Prefer stubs/fakes plus assertions on outputs; use mocks when the interaction is the spec (e.g. 'must not charge twice').

**Key points:**

- State-based vs interaction-based testing.
- Jest `jest.fn()` is a spy that can be either.
- Over-specified `toHaveBeenCalledTimes` is a smell if order is incidental.
- Verify side effects that matter (email sent) with a mock/spy.
- Classic London vs Detroit TDD schools disagree on mock density.

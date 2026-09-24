# What is over-mocking?

**Definition:**
Over-mocking is replacing so many collaborators that the test only proves your mocks return what you told them to. It stays green when the real SQL, schema, or HTTP contract breaks. Symptom: 90% mock setup, one `toHaveBeenCalled`. Fix: fewer mocks, more fakes or real integration at the boundary.

**Key points:**

- Mocks that mirror implementation line-by-line.
- Rewriting the class in `jest.fn` form.
- Tests break on rename, not on bug.
- Replace with a fake or move the test down to a pure function.
- Mock third parties, not your entire domain.

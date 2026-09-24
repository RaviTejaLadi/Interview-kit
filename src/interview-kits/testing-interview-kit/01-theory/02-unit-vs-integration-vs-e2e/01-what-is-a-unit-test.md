# What is a unit test?

**Definition:**
A unit test verifies a small piece of code (function, class, hook) in isolation, with collaborators replaced by test doubles when they are slow or nondeterministic. It should be fast, deterministic, and runnable without network or browser. The 'unit' is a design choice — some teams unit-test a module with a real in-memory DB.

**Key points:**

- No real network, clock, or filesystem unless they are the unit.
- Name: `describe(function)` + behavior, not implementation.
- Fails for one reason (ideally).
- Does not prove wiring to React or SQL.
- Pure functions are the easiest units.

```javascript
test('calculates tax exclusive of shipping', () => {
  expect(tax({ subtotal: 100, shipping: 10, rate: 0.2 })).toBe(20);
});
```

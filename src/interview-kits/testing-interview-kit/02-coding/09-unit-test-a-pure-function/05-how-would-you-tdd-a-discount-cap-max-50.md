# How would you TDD a discount cap (max 50%)?

**Definition:**
Red: test that 80% discount caps at 50% (or throws — pick a spec). Green: `Math.min(discountPct, 50)`. Refactor names. Add a test that 50% is allowed and 51% caps. This is a complete red-green-refactor story for the interview whiteboard.

**Key points:**

- Ask the interviewer the business rule first.
- Throw vs cap is a product decision.
- Write the failing test before the `Math.min`.
- Show refactor: extract `clampDiscount`.
- Keep tests on `lineTotal` public API.

```javascript
test('caps discount at 50%', () => {
  expect(lineTotal(1, 100, 80)).toBe(50);
});
```

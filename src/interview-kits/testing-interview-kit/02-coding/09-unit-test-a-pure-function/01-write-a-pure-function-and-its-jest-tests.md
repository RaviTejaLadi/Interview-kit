# Write a pure function and its Jest tests

**Definition:**
A pure function returns the same output for the same inputs and has no side effects. Unit-testing it is table-driven cases: happy path, edges, and invalid input. This is the baseline coding exercise.

**Key points:**
- No `Date.now` inside — pass clock if needed.
- `it.each` for tables.
- Names describe behavior.
- Do not test language features (`expect(1+1)`).
- Cover branch of rounding/tax rules explicitly.

```javascript
export function lineTotal(qty, unitPriceCents, discountPct = 0) {
  if (!Number.isInteger(qty) || qty < 0) throw new RangeError('qty');
  if (!Number.isInteger(unitPriceCents) || unitPriceCents < 0) throw new RangeError('price');
  const raw = qty * unitPriceCents;
  return Math.round(raw * (1 - discountPct / 100));
}

test.each([
  [2, 199, 0, 398],
  [2, 199, 10, 358],
  [0, 199, 0, 0],
])('qty=%s price=%s discount=%s => %s', (qty, price, d, expected) => {
  expect(lineTotal(qty, price, d)).toBe(expected);
});

test('rejects negative qty', () => {
  expect(() => lineTotal(-1, 100)).toThrow(RangeError);
});
```

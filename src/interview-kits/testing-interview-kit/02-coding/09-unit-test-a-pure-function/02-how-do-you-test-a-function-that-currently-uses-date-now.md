# How do you test a function that currently uses Date.now?

**Definition:**
Inject `now = () => Date.now` as a parameter (or a clock port) so tests pass a fixed timestamp. Do not spy on `Date` globally unless you must. This is the TDD design lesson: hidden time is a side effect.

**Key points:**

- Dependency injection beats `jest.useFakeTimers` for domain code.
- Fake timers still useful for debounce in UI.
- Freeze `2026-01-01T00:00:00.000Z`.
- Document timezone if formatting.
- Keep the production default `Date.now`.

```javascript
export function isExpired(expiresAtMs, now = Date.now) {
  return now() >= expiresAtMs;
}

test('token expired at the boundary', () => {
  expect(isExpired(1000, () => 1000)).toBe(true);
  expect(isExpired(1000, () => 999)).toBe(false);
});
```

# What is a false positive test?

**Definition:**
A test that passes even when the product is broken — no assertions, always-resolved mocks, swallowed errors, or asserting a mock was constructed rather than the output. Also: snapshots so large nobody reads them. Add meaningful assertions and mutation-test critical suites.

**Key points:**
- Empty `expect.assertions(0)` accidents.
- Async tests that finish before the expect.
- Missing `await` in Jest — classic.
- `expect(true).toBe(true)` leftover.
- Review tests like production code.

```javascript
test('saves the user', async () => {
  await saveUser({ email: 'a@b.com' }); // forgot expect
});
```

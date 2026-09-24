# Write tests for parse failures without throwing in production API mapping

**Definition:**
If the function returns a Result (`{ ok: false, error }`) instead of throwing, assert both branches. Table-drive invalid strings. This pattern is cleaner than try/catch in every caller test.

**Key points:**

- Result types make tests obvious.
- Do not only test the happy JSON.
- Unknown keys: decide ignore vs error and test it.
- Keep messages stable or assert on `error.code`.
- Pure parse functions are pyramid gold.

```javascript
export function parsePage(query) {
  const page = Number.parseInt(query.page ?? '1', 10);
  if (!Number.isInteger(page) || page < 1) return { ok: false, code: 'invalid_page' };
  return { ok: true, page };
}

test('defaults to page 1', () => {
  expect(parsePage({})).toEqual({ ok: true, page: 1 });
});
test('rejects 0', () => {
  expect(parsePage({ page: '0' })).toEqual({ ok: false, code: 'invalid_page' });
});
```

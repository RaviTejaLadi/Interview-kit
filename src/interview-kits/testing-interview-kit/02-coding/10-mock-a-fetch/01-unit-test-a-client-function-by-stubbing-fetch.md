# Unit-test a client function by stubbing fetch

**Definition:**
Given `getUser(id)` calls `fetch` and parses JSON, stub `globalThis.fetch` to return a Response. Assert the mapped user and that the URL is correct. Restore fetch after the test.

**Key points:**
- `mockResolvedValue` with `new Response(JSON.stringify(...))`.
- Assert `fetch` URL and headers.
- Test 404 and network reject separately.
- `afterEach(() => jest.restoreAllMocks())`.
- Prefer MSW when many components share HTTP.

```javascript
export async function getUser(id, fetchImpl = fetch) {
  const res = await fetchImpl(`/api/users/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

test('maps a 200 payload', async () => {
  const fetchImpl = jest.fn().mockResolvedValue(
    new Response(JSON.stringify({ id: '1', name: 'Ada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
  await expect(getUser('1', fetchImpl)).resolves.toEqual({ id: '1', name: 'Ada' });
  expect(fetchImpl).toHaveBeenCalledWith('/api/users/1');
});
```

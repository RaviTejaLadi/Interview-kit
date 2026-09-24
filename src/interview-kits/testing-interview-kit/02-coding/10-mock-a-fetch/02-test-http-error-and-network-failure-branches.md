# Test HTTP error and network failure branches

**Definition:**
404 → `null` (or throw — match production). 500 → throw. `fetch` reject → throw. These branches are what UI loading spinners depend on. Do not only mock 200.

**Key points:**

- One test per status class.
- `mockRejectedValue(new TypeError('network'))`.
- Do not swallow errors in the client without a test.
- Retry logic needs fake timers + multiple fetch mocks.
- Keep the client API small so tests stay short.

```javascript
test('returns null on 404', async () => {
  const fetchImpl = jest.fn().mockResolvedValue(new Response('nope', { status: 404 }));
  await expect(getUser('missing', fetchImpl)).resolves.toBeNull();
});

test('throws on 500', async () => {
  const fetchImpl = jest.fn().mockResolvedValue(new Response('err', { status: 500 }));
  await expect(getUser('1', fetchImpl)).rejects.toThrow('HTTP 500');
});
```

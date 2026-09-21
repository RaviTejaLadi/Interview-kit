# How do you assert the request body of a POST?

**Definition:**
With `jest.fn`, read `fetch.mock.calls[0][1].body`. With MSW, inspect `await request.json()` in the handler and `HttpResponse` after assertions, or use a listener. Canonicalize JSON key order if you stringify in the client.

**Key points:**
- Assert URL, method, headers, body.
- Do not over-assert incidental headers if the browser adds them.
- Content-Type application/json on POST.
- Idempotency-Key header if that is the contract.
- One focused expect on the payload fields that matter.

```javascript
test('createUser posts the email', async () => {
  const fetchImpl = jest.fn().mockResolvedValue(new Response(JSON.stringify({ id: '1' }), { status: 201 }));
  await createUser({ email: 'a@b.com' }, fetchImpl);
  expect(fetchImpl).toHaveBeenCalledWith('/api/users', expect.objectContaining({ method: 'POST' }));
  const body = JSON.parse(fetchImpl.mock.calls[0][1].body);
  expect(body).toEqual({ email: 'a@b.com' });
});
```

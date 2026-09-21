# Return rate-limit headers from the limiter

**Definition:**
Map `{ limit, remaining, reset }` to `X-RateLimit-*` and `Retry-After` on reject. Reset is the end of the current window for fixed windows.

**Key points:**
- Same numbers as REST kit headers.
- remaining never negative.
- reset as unix seconds.
- Include headers on success too.
- Document the window algorithm.

```javascript
function applyRateHeaders(res, { limit, remaining, reset }) {
  res.set('X-RateLimit-Limit', String(limit));
  res.set('X-RateLimit-Remaining', String(remaining));
  res.set('X-RateLimit-Reset', String(reset));
}

if (!result.ok) {
  res.set('Retry-After', String(Math.max(1, reset - Math.floor(Date.now() / 1000))));
  return res.status(429).json({ error: { code: 'rate_limited' } });
}
```

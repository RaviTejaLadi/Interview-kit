# What should /healthz return?

**Definition:**
Liveness should be local: process is up, event loop not wedged. Avoid downstream checks. Readiness can check 'can we serve' (DB ping with timeout). Return 200/503. Keep checks fast and cheap. Kubernetes will call them often.

**Key points:**
- Timeouts on probe HTTP client.
- Do not authenticate probes if that can fail closed wrongly — use a dedicated port or allowlist.
- Heavy checks cause false failures.
- Compose healthcheck is the same idea locally.
- Document the two endpoints.

```javascript
app.get('/healthz', (_req, res) => res.status(200).send('ok'));
app.get('/ready', async (_req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).send('ready');
  } catch {
    res.status(503).send('not ready');
  }
});
```

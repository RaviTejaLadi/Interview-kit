# Why add jitter to TTLs?

**Definition:**
If a million keys are `SET EX 60` at the same second (cache warm script, deploy), they expire together and stampede together. Random extra 0–10s spreads expiry. Probabilistic early refresh (expire slightly early in the client) also helps.

**Key points:**
- Jitter is one line and huge in effect.
- Do not jitter so much that SLAs on freshness break.
- Warm-up jobs should also stagger writes.
- Early refresh: if remaining TTL < 10% and random() < p, rebuild.
- Combine jitter + lock for hot keys.

```javascript
function ttl(base = 60) {
  return base + Math.floor(Math.random() * Math.max(1, base * 0.1));
}
```

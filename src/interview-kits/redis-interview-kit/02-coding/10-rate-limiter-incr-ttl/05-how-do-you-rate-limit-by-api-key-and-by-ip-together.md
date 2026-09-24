# How do you rate-limit by API key and by IP together?

**Definition:**
Run two counters (or a Lua that checks both). Reject if either exceeds its policy. Unauthenticated routes use IP; authenticated use key with a higher cap. Health checks bypass. This layered approach stops one key from being fine while a NAT IP hammers login.

**Key points:**

- Different limits per route (`/login` stricter).
- Normalize IPv6 carefully.
- API keys beat IP for paying customers.
- Store policies in config, not hardcoded, when they change often.
- Log which limiter fired.

```javascript
const ip = await allowRequest(redis, `ip:${req.ip}`, { limit: 20, windowSec: 60 });
const key = await allowRequest(redis, `key:${req.apiKey}`, { limit: 1000, windowSec: 60 });
if (!ip.ok || !key.ok) return deny(res, ip.ok ? key : ip);
```

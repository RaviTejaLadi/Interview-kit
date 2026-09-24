# Does reading a key refresh its TTL?

**Definition:**
No. `GET` does not extend TTL. If you want sliding sessions, you must `EXPIRE` again on access (or `GET` + `EXPIRE` pipeline). Sliding vs absolute session expiry is an application choice.

**Key points:**

- Absolute TTL: login sets `EX 86400` once.
- Sliding: refresh TTL on each authenticated request (with a cap).
- `SET` replaces the value and by default may remove TTL unless `KEEPTTL`.
- Pipelining `GET` + `EXPIRE` avoids races somewhat; still not a full lock.
- Be careful to not extend a stolen session forever without re-auth.

```javascript
const session = await redis.get(`sess:${sid}`);
if (session) await redis.expire(`sess:${sid}`, 1800);
```

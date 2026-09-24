# How do you take a distributed lock in Redis?

**Definition:**
The basic lock is `SET resource_name unique_token NX EX ttl`. If the set succeeds, you hold the lock until you `DEL` it (only if the token still matches) or it expires. The unique token prevents deleting someone else's lock after expiry. This is enough for many cache-stampede and cron jobs; it is not a silver bullet for correctness.

**Key points:**

- `NX` = only if not exists.
- `EX` = safety timeout if the process dies.
- Unlock with a compare-and-delete Lua script.
- TTL must exceed the critical section, or you need watchdog extension.
- Do not use `SETNX` + `EXPIRE` as two commands — that race is famous.

```javascript
const token = crypto.randomUUID();
const ok = await redis.set('lock:job:invoice', token, 'NX', 'EX', 30);
if (!ok) return;
try {
  await doWork();
} finally {
  await redis.eval(unlockLua, 1, 'lock:job:invoice', token);
}
```

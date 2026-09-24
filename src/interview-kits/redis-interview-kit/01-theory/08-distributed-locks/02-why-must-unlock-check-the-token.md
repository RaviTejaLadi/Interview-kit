# Why must unlock check the token?

**Definition:**
If your work runs longer than TTL, the lock expires and another process acquires it. A naive `DEL lock` then deletes the new owner's lock. Always `if GET lock == token then DEL`. Lua makes that check atomic.

**Key points:**

- This bug causes overlapping critical sections.
- Token is a random UUID, not a fixed '1'.
- Lua scripts run atomically on the Redis thread.
- Redlock and client libraries encode this pattern.
- Unit-test expiry-during-work if you can fake time.

```lua
if redis.call("GET", KEYS[1]) == ARGV[1] then
  return redis.call("DEL", KEYS[1])
else
  return 0
end
```

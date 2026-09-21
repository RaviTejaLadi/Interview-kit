# Why is INCR then EXPIRE as two commands a race?

**Definition:**
If the process dies after `INCR` to 1 and before `EXPIRE`, the key never expires and the user is blocked forever (or until eviction). Fix: Lua that INCR+EXPIRE atomically, or `SET key 1 EX window NX` plus INCR for later hits, or Redis `INCR` with expiry options in newer versions (`SET`/`EXPIRE` in MULTI).

**Key points:**
- The immortal counter is a real production bug.
- Lua / MULTI makes INCR+EXPIRE atomic.
- You can also `EXPIRE` every time (idempotent) as a belt — still a race on first create without atomicity.
- Cluster: both commands must hit the same key (they do).
- Tests should crash between commands if you want to be thorough.

```lua
local n = redis.call("INCR", KEYS[1])
if n == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
return n
```

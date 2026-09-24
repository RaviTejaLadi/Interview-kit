# How do you increment a score atomically?

**Definition:**
`ZINCRBY key delta userId` adds delta (can be negative) atomically. Do not `ZSCORE` + `ZADD` in the client — that races. For 'best score only', compare in Lua: update if new > old.

**Key points:**

- `ZINCRBY` creates the member at 0 if missing.
- Use Lua for max-score semantics.
- Validate delta server-side to prevent cheating.
- Anti-cheat does not belong only in Redis — validate on the game server.
- Pipeline submit + fetch rank for the response.

```lua
local current = tonumber(redis.call("ZSCORE", KEYS[1], ARGV[1])) or 0
local new = tonumber(ARGV[2])
if new > current then
  redis.call("ZADD", KEYS[1], new, ARGV[1])
  return new
end
return current
```

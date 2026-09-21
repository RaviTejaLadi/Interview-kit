# Why is Redis so fast?

**Definition:**
Data lives in RAM, commands are simple operations on in-memory structures, and the core executes commands sequentially on one thread (I/O may use threads in newer versions). There is no query planner like SQL. Complexity is explicit: `O(1)` `GET` vs `O(N)` `LRANGE` of a huge list.

**Key points:**
- Memory latency vs disk latency.
- Avoid large `O(N)` commands on big keys in production.
- Pipelining batches commands to cut round trips.
- Network RTT often dominates a single `GET` from a remote client.
- CPU can still saturate on Lua, JSON, or huge keys.

> 💡 Always mention Big-O of the Redis command, not only 'it is in memory'.

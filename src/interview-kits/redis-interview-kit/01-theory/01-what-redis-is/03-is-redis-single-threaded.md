# Is Redis single-threaded?

**Definition:**
Historically Redis executed commands on one main thread, which makes each command atomic and the model simple. I/O threads and some modules/commands can use more threads in modern Redis, but you still reason about the data as if commands are serialized. Blocking commands (`KEYS`, huge `HGETALL`) stall everyone.

**Key points:**
- Atomicity of a single command is a key mental model.
- Multi/exec and Lua scripts run atomically too.
- Do not run `KEYS *` in production; use `SCAN`.
- Horizontal scale: clustering / sharding, not more command threads on one dataset.
- I/O threads do not make `LRANGE` of 10M items cheap.

# What is KEEPTTL and why does it matter?

**Definition:**
A plain `SET` removes any existing expire. `SET key value KEEPTTL` updates the value and keeps the previous TTL. Without it, a background refresh can accidentally make a key immortal, which is a classic memory-leak-in-Redis bug.

**Key points:**
- `SET ... EX` always sets a new TTL.
- `KEEPTTL` is for value refresh without extending or clearing life.
- Read the SET options: `NX`, `XX`, `EX`, `PX`, `KEEPTTL`, `GET`.
- Code reviews should catch `SET` on keys that had `EXPIRE`.
- Unit-test TTL remaining after an update.

```bash
SET cache:x 1 EX 30
SET cache:x 2 KEEPTTL
TTL cache:x
```

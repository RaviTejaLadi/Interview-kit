# What is the difference between EXPIRE and EXPIREAT?

**Definition:**
`EXPIRE` sets a timeout in seconds from now. `EXPIREAT` sets an absolute Unix timestamp. `PEXPIRE`/`PEXPIREAT` use milliseconds. Absolute times are useful for 'this token dies at midnight' independent of when you set it.

**Key points:**
- Relative vs absolute timeouts.
- Clock skew across clients matters for `EXPIREAT` computed in the app — prefer Redis time if it must be exact.
- `SET ... EXAT timestamp` exists in newer Redis.
- Idempotent jobs often use `EXPIREAT` aligned to a window.
- Document whether TTL resets on read (it does not unless you `EXPIRE` again).

# What are Redis keys naming conventions?

**Definition:**
Use colons or a consistent separator: `env:service:entity:id:field`. Include a version or namespace to avoid collisions. Avoid unbounded key growth without TTL. In cluster mode, hash tags `{user:1}` colocate related keys.

**Key points:**
- `prod:session:u42` is readable in `SCAN`.
- Never invent random key shapes per feature.
- Document prefixes in a README.
- `FLUSHDB` in prod is a career-limiting key naming issue of a different kind.
- Short prefixes save memory at massive scale, but clarity usually wins first.

# Why must the API use hostname postgres not localhost?

**Definition:**
Each container has its own network namespace. `localhost` inside `api` is the API container. Postgres listens in the `postgres` container. Compose DNS resolves `postgres` to that service. This is the #1 Compose bug in interviews and real life.

**Key points:**

- Service name = hostname on the user-defined network.
- From the host machine, `localhost:5432` only works if you published 5432.
- Do not publish DB ports unless developers need GUI tools.
- Connection string host = service name.
- IPv6/`::1` confusion is a variant of the same bug.

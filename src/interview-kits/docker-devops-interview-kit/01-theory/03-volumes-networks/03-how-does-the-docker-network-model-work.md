# How does the Docker network model work?

**Definition:**
Containers on a user-defined bridge network get DNS names (`api`, `postgres`) via embedded DNS. The default `bridge` network does not provide automatic service discovery by name. `ports` publishes to the host; on a Compose network, services talk on container ports without publishing.

**Key points:**
- User-defined bridge: `api` → `postgres:5432`.
- `localhost` in a container is the container, not the host.
- From host, use `localhost:publishedPort`.
- `host` network mode shares the host stack (Linux) — special cases.
- Do not publish Postgres to `0.0.0.0` in production without a firewall.

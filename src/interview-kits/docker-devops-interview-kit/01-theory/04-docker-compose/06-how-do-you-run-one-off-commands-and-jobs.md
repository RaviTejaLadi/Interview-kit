# How do you run one-off commands and jobs?

**Definition:**
`docker compose run --rm api npm run migrate` starts a one-off container on the same network. `exec` attaches to a running service. Use one-off containers for migrations rather than changing the API entrypoint to migrate every start (unless you intentionally do that with locking).

**Key points:**
- `run` vs `exec`.
- Migrations need the DB network and env.
- Do not `run` as root if the service is not.
- `--rm` cleans up.
- K8s analog: Job / Helm pre-install hook.

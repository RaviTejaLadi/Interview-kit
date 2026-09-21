# Add a migrate job and a bind mount for local development

**Definition:**
Use `profiles` or a `migrate` service with `docker compose run --rm migrate`. For dev, override to bind-mount source and run `node --watch`. Keep production compose without bind mounts.

**Key points:**
- Override file for dev-only mounts.
- Migrations as a one-off, not always in CMD.
- `npm` watch on bind mounts.
- Named volume for `node_modules` if bind-mounting over it.
- Never bind-mount production secrets from random paths.

```yaml
# compose.dev.yaml
services:
  api:
    command: ["node", "--watch", "src/index.js"]
    volumes:
      - ./src:/app/src
  migrate:
    build: .
    command: ["node", "src/migrate.js"]
    depends_on:
      postgres:
        condition: service_healthy
    profiles: ["tools"]
```

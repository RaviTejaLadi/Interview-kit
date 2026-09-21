# How do you debug a Compose stack?

**Definition:**
`docker compose logs -f`, `ps`, `exec` into a container, inspect networks, and check health. Common failures: wrong env, not healthy, bind port in use, volume permission, app connecting to `localhost` instead of `postgres`. `docker compose config` prints the merged YAML.

**Key points:**
- `config` to verify interpolation.
- Print DNS inside the container: `getent hosts postgres`.
- Resource limits locally can OOM the DB.
- Windows: line endings and file share performance.
- Keep `restart: unless-stopped` from hiding crash loops — read logs.

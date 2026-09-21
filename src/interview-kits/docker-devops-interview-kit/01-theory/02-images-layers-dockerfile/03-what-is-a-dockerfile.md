# What is a Dockerfile?

**Definition:**
A Dockerfile is a recipe: `FROM` a base, `RUN` commands, `COPY` files, set `ENV`, `EXPOSE`, `USER`, `ENTRYPOINT`/`CMD`. BuildKit executes it and produces an OCI image. It is the unit of 'how we build this service' in most teams.

**Key points:**
- `FROM` should be specific (`node:20.11-alpine`, not `latest`).
- `CMD` vs `ENTRYPOINT`: exec form JSON array, no shell, proper signals.
- `USER` non-root for security.
- `EXPOSE` is documentation; publishing (`-p`) actually maps ports.
- Healthcheck can live in Dockerfile or in orchestrator.

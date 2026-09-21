# What is Docker Compose?

**Definition:**
Compose is a YAML-defined multi-container local (and sometimes prod) stack: services, networks, volumes, env files. `docker compose up` builds/pulls and starts the dependency graph. It is the standard way to run api + postgres + redis on a laptop.

**Key points:**
- File: `compose.yaml` / `docker-compose.yml`.
- Profiles, override files (`compose.override.yml`) for dev.
- Not a replacement for Kubernetes at scale.
- Healthchecks + `depends_on: condition: service_healthy`.
- One project name namespaces volumes/networks.

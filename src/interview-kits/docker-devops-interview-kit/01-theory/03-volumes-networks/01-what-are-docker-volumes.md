# What are Docker volumes?

**Definition:**
Volumes are persistent storage managed by Docker, mounted into containers. They survive container recreation. Use them for databases, uploads, and anything you must not keep in the writable layer. Bind mounts map a host path (great for dev, be careful in prod).

**Key points:**
- Named volume: `postgres_data:/var/lib/postgresql/data`.
- Bind mount: `./src:/app/src` for live reload.
- tmpfs: in-memory, not persisted.
- Copy-on-write container layer is not a backup.
- Permissions (UID) inside the container vs host is a common bind-mount bug.

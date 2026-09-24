# What is the difference between a bind mount and a named volume?

**Definition:**
Bind mounts use an explicit host directory; the host layout leaks into the container and backups are 'just files'. Named volumes are Docker-managed (easier on Docker Desktop VMs, portable in Compose). Bind mounts for source code in development; named volumes for database data.

**Key points:**

- Dev: bind source. Prod: copy into image, volume only for state.
- Named volumes are harder to accidentally `rm -rf` from the host path you forgot.
- NFS/cloud disks appear as volumes in Kubernetes (PersistentVolume).
- Never bind-mount Docker socket into untrusted containers (`docker.sock` = root on host).
- SELinux `:Z` labels on bind mounts on Fedora/RHEL.

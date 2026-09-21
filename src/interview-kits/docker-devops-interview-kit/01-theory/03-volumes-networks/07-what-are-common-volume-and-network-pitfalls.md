# What are common volume and network pitfalls?

**Definition:**
Data in the container layer lost on recreate; `localhost` confusion; publishing databases; bind-mounting over `node_modules`; two compose projects with the same volume name colliding; leftover networks. Windows line endings and file sharing on Docker Desktop bind mounts.

**Key points:**
- Anonymous volumes from `VOLUME` in a base image can surprise you.
- Permission denied: container user vs volume owner.
- `network_mode: service:vpn` for sidecar patterns.
- Clean up: `docker network prune` carefully.
- State belongs in volumes or managed databases, not containers.

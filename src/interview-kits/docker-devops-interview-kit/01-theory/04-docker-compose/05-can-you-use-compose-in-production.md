# Can you use Compose in production?

**Definition:**
Yes for small single-host deploys (Compose + Docker Swarm, or systemd + compose). You lose rich scheduling, self-heal across nodes, and service meshes. Most teams use Compose for local/CI and Kubernetes/ECS for production. Be honest about HA: one VM Compose is still one VM.

**Key points:**

- Single host = single failure domain.
- Swarm mode is less common than K8s today.
- Compose spec can generate K8s manifests (Kompose) as a start, not a finish.
- CI integration tests: Compose is excellent.
- Production Compose still needs backups, monitoring, and upgrades.

# What is Docker vs containerd vs Kubernetes?

**Definition:**
Docker Engine is a developer-friendly daemon (build, run, compose). containerd is a lower-level runtime used by Docker and by Kubernetes (via CRI). Kubernetes orchestrates containers across machines; it does not require the Docker CLI. Images follow OCI specs so runtimes are interchangeable (containerd, CRI-O).

**Key points:**

- OCI image + runtime specs are the standard.
- K8s deprecated the Docker shim; it still runs OCI images.
- Build: Docker, BuildKit, Buildah, `ko`, Cloud Native Buildpacks.
- Do not say 'Kubernetes replaced Docker' — they sit at different layers.
- Podman is a daemonless Docker-compatible alternative.

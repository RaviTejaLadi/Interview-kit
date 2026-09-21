# What is an image digest vs a tag?

**Definition:**
A tag (`v1.2.3`, `latest`) is a mutable pointer. A digest (`sha256:...`) is immutable content address. Production deploys should pin digests (or immutable tags you never move). `latest` is convenient and dangerous.

**Key points:**
- Someone can retag `prod` to a different image.
- Kubernetes `imagePullPolicy` + digest pins.
- Promote by digest through environments.
- `latest` in production is an interview red flag.
- Registries: Docker Hub, ECR, GCR, GHCR, ACR.

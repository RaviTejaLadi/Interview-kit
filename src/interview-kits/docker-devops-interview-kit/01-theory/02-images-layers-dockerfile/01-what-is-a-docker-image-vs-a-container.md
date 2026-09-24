# What is a Docker image vs a container?

**Definition:**
An image is an immutable, layered snapshot (filesystem + metadata: env, entrypoint, cmd, ports). A container is a running (or stopped) instance of an image with a writable layer on top. You build/pull images; you run containers.

**Key points:**

- Many containers can share one image.
- Deleting a container does not delete the image.
- Tags (`node:20-alpine`) point at image digests.
- Prefer pinning digests in production for reproducibility.
- The writable container layer is lost unless you commit (don't) or use volumes.

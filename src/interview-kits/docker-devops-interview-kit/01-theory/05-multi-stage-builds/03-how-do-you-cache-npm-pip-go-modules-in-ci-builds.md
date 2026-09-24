# How do you cache npm/pip/go modules in CI builds?

**Definition:**
Copy only lockfiles first, install, then copy source. BuildKit `--mount=type=cache,target=/root/.npm` reuses caches across builds without putting caches in the image. CI also caches BuildKit layers. Do not copy `node_modules` from the host.

**Key points:**

- Lockfile-first copy is mandatory.
- BuildKit cache mounts are CI gold.
- Platform: `--platform=linux/amd64` for Apple Silicon deploys to amd64.
- `npm ci` not `npm install` in CI.
- Prune devDependencies in the final stage.

```dockerfile
RUN --mount=type=cache,target=/root/.npm npm ci
```

# How do you handle secrets during docker build?

**Definition:**
BuildKit `RUN --mount=type=secret` injects a file not stored in layers. Do not `COPY .env` or `ARG PASSWORD` (args stay in history). CI passes `--secret id=npm,src=.npmrc`. Classic `ARG` secrets are a known leak.

**Key points:**

- `ARG` values appear in `docker history`.
- Secret mounts are the modern answer.
- SSH mounts for private git deps: `--mount=type=ssh`.
- Never echo secrets in `RUN`.
- Scan images for accidental keys.

```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
```

# What should go in .dockerignore?

**Definition:**
Exclude `node_modules`, `.git`, `.env`, secrets, test fixtures you do not need, and build outputs that will be rebuilt. This shrinks context upload and prevents accidentally copying credentials into an image layer (layers are visible to anyone who can pull).

**Key points:**

- Secrets in an image are forever in that layer history.
- Even a later `RUN rm .env` does not remove it from the previous layer.
- Smaller context = faster CI.
- Do not copy the entire repo if a subdirectory is the app.
- Review images with `docker history` / `dive`.

```text
.git
node_modules
.env
*.md
coverage
dist
```

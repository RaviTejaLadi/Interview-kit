# How do you inject configuration across environments?

**Definition:**
12-factor: env vars and mounted config, not rebuilt images per env. Kubernetes ConfigMaps/Secrets, ECS task env, or runtime files. Feature flags for behavior. Rebuild only when code or base image changes.

**Key points:**
- Same digest in staging and prod if config differs via env.
- Secrets not in git.
- `NODE_ENV=production` is not a secret store.
- Validate config at startup (fail fast).
- Avoid baking `API_URL` at build time unless you use a SPA public URL pattern carefully.

# How do you pass environment variables securely?

**Definition:**
`env_file`, `environment`, and Docker/K8s secrets. Do not commit real secrets. Use `.env` (gitignored) locally and a secret manager in prod. `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}` interpolates from the host env or `.env`.

**Key points:**
- `.env` next to Compose is interpolated by Compose itself.
- `env_file` injects into the container.
- They are not the same file always — this confuses people.
- Rotate secrets; do not bake them in images.
- Production: AWS Secrets Manager, Vault, K8s Secrets (plus encryption at rest).

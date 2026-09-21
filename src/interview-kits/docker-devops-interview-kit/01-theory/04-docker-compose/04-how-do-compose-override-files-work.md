# How do Compose override files work?

**Definition:**
`compose.yml` + `compose.override.yml` (auto-applied) or `-f a.yml -f b.yml`. Later files merge/override services. Use the override for bind mounts, debug ports, and extra services (Mailhog) without polluting the base file used in CI.

**Key points:**
- CI: `docker compose -f compose.yml -f compose.ci.yml`.
- Keep prod-like base, local-only overrides.
- Lists merge in subtle ways — check the spec when debugging.
- Project name (`-p`) isolates parallel stacks.
- Good for 'same redis/postgres, different api command'.

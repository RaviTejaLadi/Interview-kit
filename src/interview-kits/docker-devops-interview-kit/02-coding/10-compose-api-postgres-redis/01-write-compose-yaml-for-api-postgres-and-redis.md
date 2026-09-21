# Write compose.yaml for api, postgres, and redis

**Definition:**
Three services on one network, named volumes for Postgres (and optional Redis AOF), env for DB credentials, API `depends_on` healthy DB/cache. Publish only the API port to localhost.

**Key points:**
- Do not publish Postgres/Redis publicly by default.
- Healthchecks on postgres and redis.
- API env: `DATABASE_URL=postgres://...@postgres:5432/app`.
- Redis URL: `redis://redis:6379`.
- Named volume for pgdata.

```yaml
services:
  api:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      DATABASE_URL: postgres://app:${POSTGRES_PASSWORD}@postgres:5432/app
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_DB: app
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      timeout: 3s
      retries: 10
  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 10
volumes:
  pgdata:
```

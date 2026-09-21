# What is a multi-stage Docker build?

**Definition:**
One Dockerfile with multiple `FROM` stages. A builder stage has compilers and devDependencies; the final stage copies only artifacts (`COPY --from=build`). The production image never contains `g++`, npm cache, or test fixtures. This is the standard way to ship small Node/Go/Java images.

**Key points:**
- Each `FROM` starts a new stage.
- Name stages: `FROM node:20 AS build`.
- `COPY --from=build /app/dist ./dist`.
- BuildKit can skip unused stages.
- Secrets in a builder stage still must not leak into the final copy.

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
USER node
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]
```

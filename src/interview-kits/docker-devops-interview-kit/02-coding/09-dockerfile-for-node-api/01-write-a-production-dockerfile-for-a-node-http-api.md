# Write a production Dockerfile for a Node HTTP API

**Definition:**
Use a pinned Node Alpine (or slim) image, lockfile-first install, non-root user, exec-form CMD, and production env. Include a .dockerignore. This is the baseline interview artifact.

**Key points:**

- `npm ci --omit=dev`.
- `USER node`.
- Do not run `npm install` without a lockfile.
- Copy only what you need.
- Listen on `0.0.0.0`, not only localhost.

```dockerfile
FROM node:20.11-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY src ./src
USER node
EXPOSE 3000
CMD ["node", "src/index.js"]
```

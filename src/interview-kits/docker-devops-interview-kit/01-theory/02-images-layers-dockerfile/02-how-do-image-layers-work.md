# How do image layers work?

**Definition:**
Each Dockerfile instruction typically adds a layer (copy-on-write tarball). Layers are cached and reused. Changing a layer invalidates it and all layers after it. Order your Dockerfile so rarely changing steps (deps) come before frequently changing steps (app source).

**Key points:**

- Layer cache is the main build-speed lever.
- `COPY package.json` then `npm ci` then `COPY .` is the Node pattern.
- Smaller layers and fewer files → faster push/pull.
- `.dockerignore` keeps secrets and `node_modules` out.
- `RUN` commands can be chained with `&&` to reduce layers (less critical with BuildKit).

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
CMD ["node", "src/index.js"]
```

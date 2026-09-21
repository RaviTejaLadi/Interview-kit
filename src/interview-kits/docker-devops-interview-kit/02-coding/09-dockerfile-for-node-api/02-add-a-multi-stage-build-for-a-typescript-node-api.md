# Add a multi-stage build for a TypeScript Node API

**Definition:**
Build stage compiles TS; runtime stage copies `dist` and production `node_modules`. Optionally `npm ci` twice (with/without devDeps) or `prune`. Final image has no `tsc` or tests.

**Key points:**
- Builder has devDependencies.
- Runtime user is non-root.
- Same major Node version both stages.
- `tsc` output is the only JS you ship.
- CI `--target build` can run tests before runtime.

```dockerfile
FROM node:20.11-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npm run build

FROM node:20.11-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/index.js"]
```

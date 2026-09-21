# How do you copy from a stage vs from the host?

**Definition:**
`COPY file .` is from build context. `COPY --from=stage /path` is from another stage or even `COPY --from=nginx:alpine /etc/nginx`. You can use an image as a source. Context cannot escape to `../secrets` if the daemon forbids it — still never put secrets in context.

**Key points:**
- `--from=0` is the first stage by index — named stages are clearer.
- Do not copy `.git` from context.
- You can export a stage with `docker build --target build`.
- Testing stage: `--target test` to run unit tests in CI.
- Pattern: `FROM build AS test` then `RUN npm test`.

# What is a target and how does CI use it?

**Definition:**
`docker build --target test` stops at that stage. CI can run lint/test stages then build the production target separately, sharing cache. This keeps tests out of the released image while still using the same Dockerfile.

**Key points:**

- One Dockerfile, multiple artifacts.
- Fail CI on `--target test` before pushing prod.
- Matrix: test on debian, ship on distroless.
- Name stages clearly (`deps`, `build`, `test`, `runtime`).
- Attestations/SBOM from the final target.

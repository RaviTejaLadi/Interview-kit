# How do you keep images small and secure?

**Definition:**
Use alpine or distroless/slim bases, multi-stage builds so compilers never ship, non-root USER, no extra packages, scan for CVEs, pin versions, and drop capabilities. Do not install build tools in the final image. Prefer `npm ci` with a lockfile.

**Key points:**
- Distroless: no shell in prod — harder to debug, smaller attack surface.
- Alpine musl vs glibc compatibility surprises (some Node native addons).
- Run `npm ci --omit=dev` in the final stage.
- Rebuild often to pick up base-image patches.
- SBOM and image scanning in CI.

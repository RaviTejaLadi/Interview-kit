# How do you add a healthcheck in Dockerfile vs Compose vs Kubernetes?

**Definition:**
Dockerfile `HEALTHCHECK` is used by Docker Engine/Compose. Kubernetes ignores Dockerfile HEALTHCHECK and uses probes. Implement `/healthz` in the app and wire all three as appropriate. Do not only rely on Dockerfile when you deploy to K8s.

**Key points:**

- App endpoint is the source of truth.
- Compose: `healthcheck.test: curl -f http://localhost:3000/healthz`.
- K8s: httpGet probes.
- Distroless has no curl — use HTTP probes from kubelet, not curl in image.
- Alpine may need `wget -qO-` if you insist on in-container checks.

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/healthz || exit 1
```

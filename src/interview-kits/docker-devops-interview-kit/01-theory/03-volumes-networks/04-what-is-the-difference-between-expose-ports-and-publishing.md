# What is the difference between EXPOSE, ports, and publishing?

**Definition:**
`EXPOSE` in a Dockerfile documents the port. Compose `expose` makes it reachable only on the internal network. `ports: "8080:3000"` publishes host 8080 to container 3000. Orchestrators use Service objects instead of host ports for most east-west traffic.

**Key points:**
- Internal traffic should not need host ports.
- Publishing widely increases attack surface.
- IPv6 and `0.0.0.0` vs `127.0.0.1` bindings matter.
- Multiple replicas cannot all bind the same host port.
- K8s: containerPort vs Service port vs Ingress.

```yaml
services:
  api:
    ports:
      - "127.0.0.1:3000:3000"
    expose:
      - "3000"
```

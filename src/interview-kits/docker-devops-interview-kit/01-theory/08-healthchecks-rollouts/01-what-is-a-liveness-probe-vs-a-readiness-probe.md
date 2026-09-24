# What is a liveness probe vs a readiness probe?

**Definition:**
Liveness: is the process stuck? Failure → kubelet restarts the container. Readiness: should it receive traffic? Failure → remove from Service endpoints, no restart. Startup probes delay liveness for slow boots. Wrong liveness on a busy app causes restart storms.

**Key points:**

- Liveness: deadlock, infinite loop — cheap check (`/healthz`).
- Readiness: dependencies, warmup, migrations done (`/ready`).
- Do not make liveness call the database if a DB blip should not kill pods.
- Readiness may check DB; combine with retries in the app.
- Startup probe for JVM/Node cold start.

```yaml
livenessProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 10
readinessProbe:
  httpGet: { path: /ready, port: 3000 }
  periodSeconds: 5
```

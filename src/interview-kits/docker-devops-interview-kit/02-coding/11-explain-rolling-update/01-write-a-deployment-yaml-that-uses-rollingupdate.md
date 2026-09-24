# Write a Deployment YAML that uses RollingUpdate

**Definition:**
Show `strategy.rollingUpdate` with `maxSurge` and `maxUnavailable`, a readiness probe, resource requests, and a container image pinned by tag/digest. This is the coding/practical artifact for Kubernetes rollouts.

**Key points:**

- `maxUnavailable: 0` and `maxSurge: 1` = extra pod, no capacity loss (needs headroom).
- Readiness probe required for safe traffic shift.
- Labels match the Service.
- Pin the image.
- `terminationGracePeriodSeconds` for drain.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels: { app: api }
  template:
    metadata:
      labels: { app: api }
    spec:
      terminationGracePeriodSeconds: 30
      containers:
        - name: api
          image: ghcr.io/acme/api:abc123f
          ports: [{ containerPort: 3000 }]
          readinessProbe:
            httpGet: { path: /ready, port: 3000 }
            periodSeconds: 5
          resources:
            requests: { cpu: 100m, memory: 256Mi }
            limits: { memory: 512Mi }
```

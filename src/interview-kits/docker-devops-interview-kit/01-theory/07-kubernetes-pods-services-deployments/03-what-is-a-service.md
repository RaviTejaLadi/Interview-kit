# What is a Service?

**Definition:**
A Service gives a stable virtual IP and DNS name in front of pods selected by labels. Types: ClusterIP (internal), NodePort, LoadBalancer. kube-proxy or equivalent load-balances to pod endpoints. Services enable rolling updates without clients tracking pod IPs.

**Key points:**

- Selector must match pod labels.
- TargetPort is the container port.
- Headless services (`ClusterIP: None`) for StatefulSets/DNS to pods.
- ExternalName for DNS aliases.
- Ingress/Gateway sits in front for HTTP routing.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000
```

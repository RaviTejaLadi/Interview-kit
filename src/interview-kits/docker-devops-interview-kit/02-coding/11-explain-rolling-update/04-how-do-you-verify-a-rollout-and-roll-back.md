# How do you verify a rollout and roll back?

**Definition:**
`kubectl rollout status deployment/api`, watch error rate, then `kubectl rollout undo` if needed. GitOps: revert the digest commit. Confirm old ReplicaSet scales up and new scales down. Run smoke tests on a known endpoint.

**Key points:**

- `rollout history` lists revisions.
- Undo is another rolling update.
- Metrics over 'pods are running'.
- If undo is blocked by a forward-only migration, you have a real incident.
- Practice in staging.

```bash
kubectl set image deploy/api api=ghcr.io/acme/api:abc123f
kubectl rollout status deploy/api
kubectl rollout undo deploy/api
```

# Step through what happens when you change the image

**Definition:**
1) You set a new image. 2) Deployment creates a new ReplicaSet. 3) Surge pod starts, fails readiness until healthy. 4) Service endpoints add the new pod. 5) An old pod is terminated (SIGTERM). 6) Repeat until all replicas are new. 7) Old ReplicaSet remains at 0 for rollback history.

**Key points:**
- Traffic only to Ready pods.
- Old and new code both run.
- If new pods never ready, old stay (maxUnavailable 0).
- `kubectl rollout status` blocks until done.
- Describe replica sets to teach this in an interview.

```text
RS-old: 3 -> 2 -> 1 -> 0
RS-new: 0 -> 1 -> 2 -> 3
Service endpoints always point at Ready pods from both RS during the mix.
```

# How do you roll back a bad deploy?

**Definition:**
`kubectl rollout undo deployment/api` (or GitOps revert to previous digest). Kubernetes still has ReplicaSet history (`revisionHistoryLimit`). Rollback must work with the database (expand/contract). If a migration already dropped a column, undo of the app is not enough.

**Key points:**

- Pin images so undo has a real previous digest.
- Watch `rollout status`.
- Automated rollback on SLO burn (canary).
- Config-only bugs: undo the ConfigMap too.
- Practice rollback in staging.

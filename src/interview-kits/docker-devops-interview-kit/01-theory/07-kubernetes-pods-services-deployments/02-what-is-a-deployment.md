# What is a Deployment?

**Definition:**
A Deployment is a controller that maintains a ReplicaSet of identical pods from a pod template. You declare `replicas` and a new image; it performs a rolling (or other) update. It is the standard API for stateless apps. StatefulSets exist for stable identity/storage.

**Key points:**
- `spec.template` is the pod spec.
- Updating the template triggers a rollout.
- ReplicaSets are history; Deployment owns them.
- HPA scales Deployment replicas.
- Use StatefulSet/DaemonSet when Deployment semantics do not fit.

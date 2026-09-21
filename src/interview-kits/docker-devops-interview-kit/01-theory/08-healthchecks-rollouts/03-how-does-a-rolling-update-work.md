# How does a rolling update work?

**Definition:**
A Deployment raises a new ReplicaSet and adds pods with the new template, then removes old pods, keeping availability within `maxUnavailable` and `maxSurge`. The Service continues to select ready pods from both versions until the old ReplicaSet scales to 0. This requires backward-compatible APIs and DB schema.

**Key points:**
- `maxSurge`: extra pods above desired.
- `maxUnavailable`: how many can be down.
- Readiness gates traffic to new pods only when ready.
- Two versions run at once — compatibility is mandatory.
- `progressDeadlineSeconds` fails a stuck rollout.

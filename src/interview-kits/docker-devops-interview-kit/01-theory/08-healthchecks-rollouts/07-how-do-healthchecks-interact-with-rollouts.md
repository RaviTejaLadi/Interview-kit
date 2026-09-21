# How do healthchecks interact with rollouts?

**Definition:**
New pods are added to the Service only when ready. If readiness is too strict (depends on a not-yet-migrated schema), the rollout stalls. If liveness is too strict, new pods restart and never become ready. Tune initialDelay/startupProbe. `minReadySeconds` avoids flapping.

**Key points:**
- Stuck rollout: `kubectl describe` probes failing.
- CrashLoopBackOff: app bug or liveness too aggressive.
- Readiness false on all pods = full outage even if processes live.
- Load balancers have their own health checks — align them.
- Local Compose healthchecks catch the same class of bugs.

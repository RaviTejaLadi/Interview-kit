# How do labels and selectors work?

**Definition:**
Labels are key-value metadata on objects. Selectors find pods for Services, Deployments, and NetworkPolicies. Rolling updates work because the Service selects `app=api` while pods with the new hash still have that label. Be precise — a too-wide selector routes traffic to the wrong pods.

**Key points:**

- Recommended: `app`, `version`, `component`.
- Service selector should not include the unique pod-template-hash if you want both old and new during rollout (Deployment handles this).
- NetworkPolicy uses labels too.
- Labels are for grouping; names are unique IDs.
- Do not overload labels with huge values.

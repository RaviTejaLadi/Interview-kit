# What is a Recreate vs RollingUpdate vs blue-green vs canary?

**Definition:**
Recreate: kill all old, start new (downtime, simple for incompatible versions). RollingUpdate: default, mix versions. Blue-green: two full environments, switch traffic at the load balancer. Canary: send a small % to the new version (Service mesh, Ingress weights, or Flagger). Pick based on risk and compatibility.

**Key points:**

- Recreate if you cannot run two versions.
- Blue-green uses 2× resources briefly.
- Canary needs metrics (error rate) to halt.
- Feature flags can canary without two binaries.
- Interview: name the trade-offs, not only the buzzwords.

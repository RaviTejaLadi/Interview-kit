# What is a flaky test?

**Definition:**
A flaky test sometimes fails with no product change — reruns pass. Causes: races, time, order dependence, shared mutable state, network, animation, retries hiding bugs. Flakes destroy trust in CI; people retry until green. Treat flakes as defects.

**Key points:**
- Non-determinism is the root.
- Quarantine is temporary.
- Rerun-until-green is a process smell.
- Track flake rate as a metric.
- Fix or delete; do not ignore.

# What is GitOps?

**Definition:**
Desired cluster state (Helm/Kustomize manifests, image digests) lives in git. A controller (Argo CD, Flux) reconciles the cluster to git. Deploys are git commits; rollbacks are git reverts. CI pushes images and opens a PR/commit that bumps the digest.

**Key points:**
- Git is the source of truth for what should run.
- Cluster pull vs CI push (`kubectl` from Jenkins).
- PR review on deploy diffs.
- Drift detection.
- Still need image CI; GitOps is the CD half.

# What is CI vs CD?

**Definition:**
Continuous Integration automatically builds and tests every change (lint, unit, image build). Continuous Delivery keeps `main` releasable; a human may click deploy. Continuous Deployment deploys every green build to production automatically. Docker images are the usual artifact that flows through the pipeline.

**Key points:**
- CI: fast feedback on PRs.
- CD: path to production is automated and repeatable.
- Artifact: OCI image digest, not 'the code on the server'.
- Separate 'build once' from 'deploy many environments'.
- GitOps (Argo CD) is a CD style: cluster pulls desired manifests.

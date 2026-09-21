# What breaking changes make rolling updates unsafe?

**Definition:**
Removing a REST field the old UI needs, changing auth, dropping a DB column the old pods still write, swapping encryption keys, or making readiness depend on a new exclusive schema. Fix with expand/contract deploys, feature flags, or Recreate/blue-green when coexistence is impossible.

**Key points:**
- Two binaries, one database is the default constraint.
- API versioning or additive fields.
- Migrations split across deploys.
- Protocol changes (gRPC) need compatibility.
- Document a two-phase release.

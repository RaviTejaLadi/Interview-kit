# What is Trunk-Based Development and why is it preferred in modern CI/CD teams?

**Trunk-Based Development (TBD)** is a development strategy where developers integrate their changes into a single shared branch, called the **trunk** (usually `main`), frequently.

Branches, if used, are generally **very short-lived**.

```text
             feature
                │
                ↓
main ──A──B──C──D──E──F──G
          ↑     ↑
       frequent integration
```

Instead of keeping a feature branch alive for weeks:

```text
main ────────────────────────────
        \
         feature ────────────────
                              ↑
                         merge after weeks
```

developers integrate small changes frequently:

```text
main ──A──B──C──D──E──F──G
        ↑  ↑  ↑  ↑
       small frequent changes
```

## Why is it popular with CI/CD?

Because CI/CD works best when changes are **small and integrated frequently**.

Benefits include:

### 1. Smaller merge conflicts

A branch living for three weeks can diverge significantly.

A branch living for a few hours is much easier to merge.

### 2. Faster feedback

Every change can trigger:

```text
Commit
  ↓
CI
  ↓
Tests
  ↓
Build
  ↓
Deploy
```

### 3. Reduced integration risk

Instead of integrating a huge feature all at once, developers integrate small pieces continuously.

### 4. Easier continuous delivery

If `main` is always in a releasable state, deployment becomes much simpler.

### 5. Less branch management

You don't need the long-lived:

```text
develop
release/*
hotfix/*
```

structure typically associated with GitFlow.

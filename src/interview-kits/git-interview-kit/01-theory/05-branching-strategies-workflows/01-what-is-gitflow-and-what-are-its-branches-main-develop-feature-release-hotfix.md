# What is GitFlow and what are its branches?

**GitFlow** is a Git branching model that uses multiple long-lived branches and specific temporary branches for features, releases, and hotfixes.

The traditional GitFlow structure looks like this:

```text
main
  │
  ├── release/1.0
  │
develop
  │
  ├── feature/login
  ├── feature/payment
  └── feature/profile
```

## `main`

Contains the **production-ready code**.

Typically, every commit on `main` represents code that is or can be deployed to production.

---

## `develop`

Contains the latest integrated development work.

Feature branches are normally merged into `develop`.

```text
feature/login
      │
      ↓
   develop
```

---

## `feature/*`

Used for developing individual features.

Example:

```text
feature/login
feature/payment
feature/user-profile
```

Usually created from `develop`:

```bash
# Create a feature branch from the current branch.
git switch -c feature/login
```

When the feature is complete:

```text
feature/login
      ↓
   develop
```

---

## `release/*`

Used to prepare a specific release.

Example:

```text
release/1.0.0
release/2.0.0
```

Typical flow:

```text
develop
   ↓
release/1.0.0
   ↓
Testing / Bug fixes
   ↓
main
```

The release branch allows final testing and stabilization without stopping ongoing development on `develop`.

---

## `hotfix/*`

Used to quickly fix critical production issues.

A hotfix normally starts from `main`.

```text
main
 │
 └── hotfix/payment-bug
```

After fixing it, the hotfix is merged back into:

- `main`
- `develop`

Conceptually:

```text
             ┌── develop
             │
main ──→ hotfix
  │          │
  └──────────┘
```

### GitFlow summary

```text
feature/* ──→ develop ──→ release/* ──→ main

main ──→ hotfix/* ──→ main
                  └──→ develop
```

### When is GitFlow useful?

GitFlow can work well when you have:

- scheduled releases
- multiple supported release versions
- formal QA/release phases
- products that don't deploy continuously

However, it can become unnecessarily complex for teams practicing continuous delivery.

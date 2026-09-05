# Merge vs Rebase: Pros, cons, and trade-offs

|                    | Merge                          | Rebase                       |
| ------------------ | ------------------------------ | ---------------------------- |
| History            | Preserves existing history     | Rewrites history             |
| Merge commits      | May create them                | Usually avoids them          |
| Commit IDs         | Existing commits stay the same | Replayed commits get new IDs |
| History appearance | Can be more complex            | Usually linear/clean         |
| Public branches    | Safe                           | Generally avoid              |
| Conflict handling  | Usually during merge           | Can happen during replay     |
| Good for           | Integrating shared work        | Cleaning private/local work  |

## Merge — Pros

### 1. Preserves history

You can see exactly when branches diverged and were integrated.

### 2. Safe for shared branches

Existing commits aren't rewritten.

### 3. Good for collaboration

Other developers don't have to deal with rewritten commit history.

## Merge — Cons

The history can become noisy:

```text
A---B---C-------M---F
     \         /
      D---E---
```

Large projects can accumulate many merge commits.

---

## Rebase — Pros

### 1. Cleaner history

Instead of:

```text
A---B---C-------M
     \         /
      D---E---
```

you can get:

```text
A---B---C---D'---E'
```

### 2. Easier to read

A linear history can make `git log` easier to understand.

### 3. Useful before creating a PR

You can update your feature branch with the latest `main` and clean up your commits before sharing it.

## Rebase — Cons

### 1. Rewrites history

Commit IDs change.

### 2. Can cause problems for shared branches

Other developers may already have the old commits.

### 3. Conflict resolution can be repetitive

With several commits, you may need to resolve conflicts during multiple replay steps.

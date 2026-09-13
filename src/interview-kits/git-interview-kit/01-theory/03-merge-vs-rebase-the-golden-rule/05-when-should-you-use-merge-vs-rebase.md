# When should you use Merge vs Rebase?

A practical rule:

### Use Rebase for your private/local feature work

For example:

```text
main:     A---B---C
               \
feature:        D---E
```

Before opening a PR, you might do:

```bash
# Update the feature branch on top of the latest main.
git switch feature
git rebase main
```

Result:

```text
A---B---C---D'---E'
```

This gives you a cleaner feature history.

---

### Use Merge for shared/public branches

For example, if multiple developers use:

```text
origin/main
```

avoid rewriting its history with rebase.

Instead:

```bash
# Integrate the feature branch without rewriting existing commits.
git switch main
git merge feature
```

### Practical team rule

```text
Private branch → Rebase is usually fine
Shared branch  → Prefer Merge
```

There are exceptions depending on your team's Git workflow, but this is a good default.

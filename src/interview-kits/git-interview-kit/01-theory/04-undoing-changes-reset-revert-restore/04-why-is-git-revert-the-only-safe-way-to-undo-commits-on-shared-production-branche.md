# Why is `git revert` the safe way to undo commits on shared/production branches?

Suppose `main` is shared:

```text
A---B---C---D  ← origin/main
```

Other developers may already have `C` and `D`.

If you use:

```bash
# Avoid rewriting the shared branch history.
git reset --hard B
```

your local branch becomes:

```text
A---B
```

Now the remote/shared history and your history disagree.

You would likely need a force push, potentially disrupting other developers.

Instead:

```bash
# Safely create a new commit that reverses D.
git revert D
```

History becomes:

```text
A---B---C---D---R
```

Everyone keeps the same history, and `R` contains the inverse of `D`.

### Why this is safer

`git revert`:

- doesn't remove existing commits
- doesn't rewrite shared history
- doesn't require a force push in the normal case
- provides an explicit record of the rollback

This is why it is the standard approach for undoing already-published commits on **shared or production branches**.

> “Only safe way” is a useful rule of thumb, but technically there are other controlled ways to repair shared history. For normal team workflows, **revert is the safe default**.

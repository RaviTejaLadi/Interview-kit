# What is a Fast-Forward merge?

A **Fast-Forward (FF) merge** happens when the current branch has no new commits since the other branch was created.

Example:

```text
A---B             main
     \
      C---D       feature
```

If `main` has not moved, Git doesn't need to create a merge commit.

After:

```bash
# Fast-forward main when possible.
git switch main
git merge feature
```

Git simply moves the `main` pointer:

```text
A---B---C---D     main
             ↑
           feature
```

There is **no merge commit**.

### Why "fast-forward"?

Because Git can simply move the branch pointer forward.

```text
Before:

main → B

After:

main → D
```

### Force a merge commit

You can explicitly request a merge commit:

```bash
# Create a merge commit even when a fast-forward is possible.
git merge --no-ff feature
```
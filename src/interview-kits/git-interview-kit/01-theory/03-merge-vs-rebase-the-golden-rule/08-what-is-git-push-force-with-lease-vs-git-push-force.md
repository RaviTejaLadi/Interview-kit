# 8. What is `git push --force-with-lease` vs `git push --force`?

These commands are generally used when a normal push is rejected because your local branch history no longer matches the remote history, often after a rebase.

## `git push --force`

`--force` tells Git:

> **Replace the remote branch with my version, even if that discards remote commits.**

```bash
# Force-update the remote branch, potentially overwriting remote history.
git push --force origin feature
```

This is dangerous because you can overwrite someone else's work.

Example:

```text
Remote:
A---B---C---D

Your local:
A---B---C---E
```

A force push can make the remote:

```text
A---B---C---E
```

and `D` is no longer part of that branch's history.

---

## `git push --force-with-lease`

`--force-with-lease` is a **safer form of force push**.

```bash
# Force-update only if the remote branch is still where you expect it to be.
git push --force-with-lease origin feature
```

It essentially says:

> **"Force the update, but only if the remote branch hasn't changed unexpectedly since I last checked."**

Suppose you last saw:

```text
Remote:
A---B---C
```

You rebase locally:

```text
A---B---C---D'
```

But another developer pushes:

```text
A---B---C---X
```

Now the remote has changed.

`--force-with-lease` can detect that the remote isn't where you expected and **reject your push instead of blindly overwriting `X`**.

That's why it is generally preferred over `--force`.

---

# Quick Revision Cheat Sheet

| Concept                  | Definition                                                                |
| ------------------------ | ------------------------------------------------------------------------- |
| **Merge**                | Combines two lines of development while preserving their existing commits |
| **3-way merge**          | Combines changes using the common ancestor and both branch tips           |
| **Fast-forward**         | Moves a branch pointer forward without creating a merge commit            |
| **Rebase**               | Replays commits onto a new base, creating new commit IDs                  |
| **Merge**                | Preserves history but can create a more complex graph                     |
| **Rebase**               | Creates cleaner history but rewrites commits                              |
| **Golden Rule**          | Don't rebase commits that others have already based work on               |
| **Squash**               | Combines multiple commits into one                                        |
| **`--force`**            | Forcefully replaces remote branch history                                 |
| **`--force-with-lease`** | Force-pushes only when the remote is still in the expected state          |

### The easiest way to remember

```text
MERGE
Preserve history
      ↓
A---B---C------M
     \        /
      D------E


REBASE
Rewrite/replay history
      ↓
A---B---C---D'---E'


SQUASH
Combine commits
      ↓
A---B---C---D
        ↓
A---D'


FORCE-WITH-LEASE
"Overwrite, but first check nobody changed the remote."
```

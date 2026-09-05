# What does `git reset` do?

`git reset` moves the current branch/`HEAD` to another commit and can optionally change the **staging area** and **working directory**.

It is mainly used to:

* undo commits locally
* unstage files
* move a branch pointer backward
* discard local changes, depending on the option

For example:

```bash
# Move HEAD and the current branch back by one commit.
git reset HEAD~1
```

By default, `git reset` uses **`--mixed`** mode.

Conceptually:

```text
Before:

A---B---C  ← HEAD/main

After reset HEAD~1:

A---B      ← HEAD/main
     \
      C    ← old commit
```

The commit `C` is no longer pointed to by the branch, although it may still be recoverable through the reflog for some time.
# What is commit squashing?

**Commit squashing** means combining multiple commits into a **single commit**.

Suppose you have:

```text
A---B---C---D---E
```

where:

```text
B = Add login
C = Fix login typo
D = Fix validation
E = Fix tests
```

You might want the final history to contain:

```text
A---F
```

where `F` contains all the changes from `B` through `E`.

### Interactive rebase

You can use:

```bash
# Interactively combine the last four commits.
git rebase -i HEAD~4
```

Git opens an editor with something like:

```text
pick B Add login
pick C Fix login typo
pick D Fix validation
pick E Fix tests
```

You can change it to:

```text
pick B Add login
squash C Fix login typo
squash D Fix validation
squash E Fix tests
```

Git then combines them into one commit.

### Why squash?

Instead of:

```text
Add login
Fix typo
Fix login
Fix tests
Fix again
Final fix
```

you can have:

```text
Add login
```

This produces a cleaner project history.

### Important

Squashing **rewrites commit history**, so be careful with commits that are already shared.
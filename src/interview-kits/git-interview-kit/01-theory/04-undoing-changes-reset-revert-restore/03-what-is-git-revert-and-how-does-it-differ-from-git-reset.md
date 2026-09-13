# What is `git revert` and how does it differ from `git reset`?

`git revert` **creates a new commit that reverses the changes introduced by an earlier commit**.

Example:

```text
A---B---C
```

You want to undo `C`.

Run:

```bash
# Create a new commit that reverses commit C.
git revert C
```

Git produces:

```text
A---B---C---R
```

Where `R` is a new commit that reverses `C`.

### Reset

```text
A---B---C
        ↓
     reset
        ↓
A---B
```

`reset` moves the branch pointer backward.

### Revert

```text
A---B---C---R
```

`revert` keeps the original commit and adds another commit that undoes it.

### Simple difference

> **Reset changes where the branch points.**

> **Revert adds a new commit that undoes an existing commit.**

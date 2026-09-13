# What is `git merge` and what is a 3-way merge commit?

`git merge` combines the changes from one branch into another branch.

Suppose the history looks like this:

```text
A---B---C        main
     \
      D---E      feature
```

If you are on `main` and run:

```bash
# Merge the feature branch into main.
git switch main
git merge feature
```

Git combines the histories:

```text
A---B---C-------M    main
     \         /
      D---E---      feature
```

`M` is a **merge commit**.

## What is a 3-way merge?

A **3-way merge** uses three commits:

1. **Current branch tip** → `C`
2. **Other branch tip** → `E`
3. **Common ancestor** → `B`

```text
          C
         / \
        B   M
         \ /
          E
```

Git compares:

```text
B → C
B → E
```

and combines those changes into the merge result `M`.

### Why is it called 3-way?

Because Git uses:

```text
Common Ancestor
      +
Current Branch
      +
Other Branch
      ↓
Merge Result
```

If both branches changed the same lines differently, Git may report a **merge conflict**.

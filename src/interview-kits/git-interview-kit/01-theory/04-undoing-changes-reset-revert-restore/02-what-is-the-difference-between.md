# Difference between `--soft`, `--mixed`, and `--hard`

The three modes differ in **what they change after moving `HEAD`**.

| Mode      | HEAD      | Staging Area | Working Directory   |
| --------- | --------- | ------------ | ------------------- |
| `--soft`  | ✅ Changed | ❌ Unchanged  | ❌ Unchanged         |
| `--mixed` | ✅ Changed | ✅ Reset      | ❌ Unchanged         |
| `--hard`  | ✅ Changed | ✅ Reset      | ✅ Reset/overwritten |

A useful diagram:

```text
HEAD
 │
 ↓
Staging Area
 │
 ↓
Working Directory
```

The more aggressive the reset, the further down this stack it affects.

---

## 2.1 `git reset --soft`

`--soft` moves `HEAD` but leaves the **Index and Working Directory unchanged**.

```bash
# Move HEAD back one commit while keeping the changes staged.
git reset --soft HEAD~1
```

Before:

```text
A---B---C  ← HEAD
```

After:

```text
A---B      ← HEAD
     \
      C    ← old commit
```

But the changes introduced by `C` remain **staged**.

This is useful when you want to:

* undo a commit
* modify its commit message
* combine it with another commit
* recommit the same changes differently

Example:

```text
Before:

HEAD      → C
Index     → C
Working   → C

After --soft:

HEAD      → B
Index     → C's changes
Working   → C's changes
```

---

## 2.2 `git reset --mixed`

`--mixed` moves `HEAD` and resets the **staging area**, but leaves your actual files unchanged.

```bash
# Move HEAD back one commit and unstage its changes.
git reset --mixed HEAD~1
```

This is the **default** mode:

```bash
# Equivalent to git reset --mixed HEAD~1.
git reset HEAD~1
```

Example:

```text
Before:

HEAD      → C
Index     → C
Working   → C

After --mixed:

HEAD      → B
Index     → B
Working   → C's changes
```

So the changes become **unstaged modifications**.

You can then selectively stage them again:

```bash
# Stage only the changes you want to keep for the next commit.
git add app.js
```

---

## 2.3 `git reset --hard`

`--hard` moves `HEAD`, resets the staging area, **and makes the Working Directory match the target commit**.

```bash
# Reset HEAD, the index, and working files to the previous commit.
git reset --hard HEAD~1
```

Example:

```text
Before:

HEAD      → C
Index     → C
Working   → C

After --hard:

HEAD      → B
Index     → B
Working   → B
```

Any tracked working-tree changes that are overwritten can be **lost**.

⚠️ **Be very careful with `--hard`.**

### Easy memory trick

```text
--soft   → HEAD only
--mixed  → HEAD + Index
--hard   → HEAD + Index + Working Directory
```
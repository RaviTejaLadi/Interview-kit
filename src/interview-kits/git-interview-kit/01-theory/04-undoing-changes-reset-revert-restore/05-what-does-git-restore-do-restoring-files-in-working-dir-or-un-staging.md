# What does `git restore` do?

`git restore` is primarily used to **restore files in the Working Directory or restore files in the Staging Area**.

It was introduced to make file-restoration operations clearer instead of using `git checkout` for multiple purposes.

---

## Restore a file in the Working Directory

Suppose:

```text
HEAD/Index → Version A
Working    → Version B
```

You want to discard your working-tree changes:

```bash
# Restore app.js from the index, discarding its unstaged working-tree changes.
git restore app.js
```

Result:

```text
HEAD/Index → Version A
Working    → Version A
```

⚠️ Your unstaged changes to that file are discarded.

---

## Unstage a file

Suppose you ran:

```bash
# Stage app.js.
git add app.js
```

You can unstage it with:

```bash
# Remove app.js from the staging area while keeping the working-tree changes.
git restore --staged app.js
```

Result:

```text
HEAD       → Version A
Index      → Version A
Working    → Version B
```

The changes are still in your working directory; they are simply **unstaged**.

### Important distinction

```text
git restore file
        ↓
Restore Working Directory

git restore --staged file
        ↓
Restore Staging Area
```

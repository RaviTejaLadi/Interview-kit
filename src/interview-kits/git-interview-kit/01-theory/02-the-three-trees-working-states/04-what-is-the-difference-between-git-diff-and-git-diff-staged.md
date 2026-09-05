# What is the difference between `git diff` and `git diff --staged`?

This is one of the most important Git commands to understand.

## `git diff`

Shows changes between:

**Working Directory ↔ Staging Area**

```bash
# Show changes that have not been staged.
git diff
```

Example:

```text
Index
  ↓
Version 1

Working Directory
  ↓
Version 2
```

`git diff` shows:

```text
Version 1 → Version 2
```

So it answers:

> **"What have I changed that I haven't staged yet?"**

---

## `git diff --staged`

Shows changes between:

**Staging Area ↔ HEAD**

```bash
# Show changes that are staged for the next commit.
git diff --staged
```

Example:

```text
HEAD
 ↓
Version 1

Index
 ↓
Version 2
```

It shows:

```text
Version 1 → Version 2
```

So it answers:

> **"What exactly will go into my next commit?"**

### Easy comparison

| Command             | Compares                         | Shows                         |
| ------------------- | -------------------------------- | ----------------------------- |
| `git diff`          | Working Directory ↔ Index        | Unstaged changes              |
| `git diff --staged` | Index ↔ HEAD                     | Staged changes                |
| `git diff HEAD`     | Working Directory + Index ↔ HEAD | All changes since last commit |

### Remember this

```text
HEAD
 │
 │ git diff --staged
 ↓
INDEX
 │
 │ git diff
 ↓
WORKING DIRECTORY
```

This diagram is extremely useful for remembering the difference.

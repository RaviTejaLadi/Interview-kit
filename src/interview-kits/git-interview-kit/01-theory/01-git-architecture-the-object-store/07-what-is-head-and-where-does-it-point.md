# What is `HEAD` and where does it point?

**`HEAD` is a special reference that tells Git what commit/branch you currently have checked out.**

Usually, `HEAD` points to a **branch reference**, not directly to a commit.

For example:

```text
HEAD
 │
 ↓
refs/heads/main
 │
 ↓
Commit C
```

The `.git/HEAD` file might contain:

```text
ref: refs/heads/main
```

This is called a **symbolic reference**.

### When you make a commit

Suppose:

```text
HEAD
 ↓
main
 ↓
Commit A
```

After:

```bash
# Create a new commit.
git commit -m "Add login page"
```

you get:

```text
HEAD
 ↓
main
 ↓
Commit B
 ↓
Commit A
```

Both `HEAD` and `main` effectively move to the new commit because `HEAD` follows the `main` reference.

---

## Detached HEAD

`HEAD` can also point **directly to a commit**.

For example:

```text
HEAD
 │
 ↓
Commit B
```

This is called **detached HEAD**.

It commonly happens when you check out a specific commit:

```bash
# Check out a specific commit, putting HEAD into detached state.
git checkout <commit-id>
```

Modern Git also supports:

```bash
# Switch to a specific commit in detached HEAD mode.
git switch --detach <commit-id>
```

### The whole picture

```text
                    HEAD
                     │
                     ↓
              refs/heads/main
                     │
                     ↓
                  Commit C
                     │
                     ↓
                  Commit B
                     │
                     ↓
                  Commit A
                     │
                     ↓
              Root/initial commit
```

A useful mental model is:

**Working Tree → Index → Commit → Tree → Blob**

while:

**HEAD → Branch → Commit**

That distinction makes a lot of Git internals much easier to understand.

# What is a Git branch under the hood?

A **Git branch is essentially a movable reference pointing to a commit**.

For example:

```text
main
 │
 ↓
A1B2C3...   ← Commit
```

When you create a new commit:

```text
main
 │
 ↓
Commit C
   ↑
Commit B
   ↑
Commit A
```

The `main` branch reference moves forward:

```text
Before:

main → B

After:

main → C
```

The commits themselves don't move. **The branch reference moves.**

### Is it exactly a 41-byte pointer file?

For a traditional **loose branch ref**, a file such as:

```text
.git/refs/heads/main
```

may contain something like:

```text
a1b2c3d4...40 hex characters...
```

plus a newline.

So with SHA-1 it is typically **41 bytes of text**: 40 hexadecimal characters + newline.

But saying **“a branch is always a 41-byte file” is too strong**.

Git can store references in different ways, including:

- packed refs
- symbolic refs
- different reference storage implementations

So the better interview definition is:

> **A Git branch is a movable reference that points to a commit, usually represented by a ref containing the commit's object ID.**

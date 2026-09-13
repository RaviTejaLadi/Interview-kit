# What is `.gitignore` and how do you ignore files that were already tracked?

`.gitignore` is a file that tells Git which **untracked files and directories should be ignored**.

Typical things to ignore include:

```text
node_modules/
.env
dist/
coverage/
*.log
```

Example `.gitignore`:

```gitignore
# Dependencies
node_modules/

# Environment variables
.env

# Build output
dist/

# Log files
*.log
```

After adding these patterns, Git won't normally show matching **untracked** files in `git status`.

---

## What if the file was already tracked?

This is an important gotcha.

`.gitignore` does **not** automatically stop tracking a file that Git is already tracking.

Suppose:

```text
.env
```

was already committed.

Adding:

```gitignore
.env
```

doesn't remove `.env` from Git's index.

You need to remove it from the **Index**, while keeping the file on your computer.

```bash
# Stop tracking .env while keeping the local file.
git rm --cached .env
```

Then commit the change:

```bash
# Commit the removal from Git tracking.
git commit -m "Stop tracking environment file"
```

Now `.env` remains on your computer but is ignored by Git.

### For an already-tracked directory

For example, if `dist/` was already tracked:

```bash
# Stop tracking dist/ while keeping the directory locally.
git rm -r --cached dist/
```

Then commit:

```bash
# Commit the change to stop tracking dist/.
git commit -m "Stop tracking build output"
```

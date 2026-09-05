# What does `git clean -fd` do?

`git clean` removes **untracked files and directories** from the Working Directory.

```bash
# Remove untracked files and untracked directories.
git clean -fd
```

The options mean:

```text
-f → force
-d → include directories
```

For example:

```text
project/
├── app.js          tracked
├── package.json    tracked
├── notes.txt       untracked
└── temp/           untracked directory
    └── test.txt
```

Running:

```bash
# Remove untracked files and directories.
git clean -fd
```

can remove:

```text
notes.txt
temp/
```

The tracked files remain.

### Very important ⚠️

`git clean -fd` can permanently delete untracked files.

It's a good idea to preview first:

```bash
# Preview which untracked files/directories would be removed.
git clean -fdn
```

`-n` means **dry run**.

So:

```text
git clean -fdn
        ↓
"Show me what would be deleted"

git clean -fd
        ↓
"Actually delete it"
```

---

# Quick Revision Cheat Sheet

| Command                     | Main purpose                                         |
| --------------------------- | ---------------------------------------------------- |
| `git reset --soft`          | Move `HEAD`; keep changes staged                     |
| `git reset --mixed`         | Move `HEAD`; unstage changes; keep files             |
| `git reset --hard`          | Move `HEAD`; reset staging and tracked working files |
| `git revert`                | Create a new commit that undoes another commit       |
| `git restore file`          | Restore working-tree file                            |
| `git restore --staged file` | Unstage a file                                       |
| `git clean -fd`             | Delete untracked files and directories               |
| `git clean -fdn`            | Preview what `git clean -fd` would delete            |

### One diagram to remember everything

```text
                 COMMIT HISTORY
                       ↑
                    HEAD
                       │
             git reset --soft
                       │
                       ↓
                 STAGING / INDEX
                       │
             git restore --staged
                       │
                       ↓
                WORKING DIRECTORY
                       │
                git restore
                       │
                       ↓
             Discard working changes


git revert
    ↓
Creates a NEW commit
that reverses an OLD commit


git clean -fd
    ↓
Deletes untracked files/directories
```

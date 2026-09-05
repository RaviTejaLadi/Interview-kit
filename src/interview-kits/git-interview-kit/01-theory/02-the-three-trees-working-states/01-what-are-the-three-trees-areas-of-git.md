# What are the Three Trees / Areas of Git?

Git has three important areas:

```text
Working Directory
       │
       │ git add
       ↓
Staging Area (Index)
       │
       │ git commit
       ↓
Repository / Commit History
```

## 1.1 Working Directory

The **Working Directory** is the actual project files you currently have checked out on your computer.

It can contain:

* modified files
* new/untracked files
* deleted files
* files that haven't been changed

Example:

```text
project/
├── index.html
├── app.js
└── style.css
```

If you edit `app.js`, the change initially exists only in the **Working Directory**.

---

## 1.2 Staging Area (Index)

The **Staging Area**, also called the **Index**, is the snapshot of changes you have selected for the **next commit**.

You put changes into it using:

```bash
# Stage app.js for the next commit.
git add app.js
```

Think of staging as a **preparing area**.

You can modify three files but stage only one:

```text
Working Directory
├── app.js       modified
├── style.css    modified
└── index.html   modified

        ↓ git add app.js

Staging Area
└── app.js       staged
```

Only the staged version will be included in the next commit.

---

## 1.3 Commit History / Repository

The **repository** contains committed snapshots and their history.

When you run:

```bash
# Create a commit from the current staging area.
git commit -m "Update app"
```

Git creates a new commit from the **staging area**.

Conceptually:

```text
Working Directory
       ↓
     git add
       ↓
Staging Area
       ↓
    git commit
       ↓
Repository
       ↓
    Commit
```

### Important clarification

`HEAD` itself isn't the commit history. `HEAD` is a **reference that identifies your current checkout**, normally through the current branch.

So a more precise terminology is:

> **Working Directory → Index → Repository, with HEAD identifying the currently checked-out commit/branch.**

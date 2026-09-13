# What is the `.git` folder and what does it store?

The **`.git` folder** is the internal database and metadata directory of a Git repository.

When you run:

```bash
git init
```

Git creates the `.git` directory.

It contains information such as:

```text
.git/
├── HEAD
├── config
├── index
├── objects/
├── refs/
├── logs/
└── hooks/
```

### Important parts

**`HEAD`**

Tells Git what you currently have checked out.

**`objects/`**

Stores Git's underlying objects:

- blobs
- trees
- commits
- annotated tags

**`refs/`**

Stores references such as:

```text
refs/heads/main
refs/heads/feature
refs/tags/v1.0
```

**`index`**

The **staging area**. It records what will be included in the next commit.

**`config`**

Repository-specific Git configuration.

**`logs/`**

Stores reflog information, which can help you recover references after operations such as resets.

### Important distinction

Your working files are **not stored inside `.git` as normal files**.

Think of it like:

```text
Working Tree
     ↓
   git add
     ↓
  Index
     ↓
 git commit
     ↓
.git/objects
```

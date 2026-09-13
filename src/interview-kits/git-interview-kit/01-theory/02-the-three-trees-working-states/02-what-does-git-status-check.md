# What does `git status` check?

`git status` compares the state of your project across Git's important areas and tells you what has changed.

```bash
# Show the current working-tree and staging-area status.
git status
```

It can tell you about:

- untracked files
- modified files
- deleted files
- staged changes
- unstaged changes
- current branch
- commits ahead/behind a remote in some configurations

For example:

```text
Changes to be committed:
  modified: app.js

Changes not staged for commit:
  modified: style.css

Untracked files:
  test.js
```

This means:

```text
app.js
  → staged

style.css
  → modified but not staged

test.js
  → untracked
```

### What is Git effectively comparing?

A useful mental model is:

```text
HEAD
  ↕
Index
  ↕
Working Directory
```

Git determines what differs between these states and reports it.

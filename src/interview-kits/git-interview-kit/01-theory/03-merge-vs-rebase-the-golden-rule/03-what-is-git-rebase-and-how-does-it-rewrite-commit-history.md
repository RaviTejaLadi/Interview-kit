# What is `git rebase` and how does it rewrite commit history?

`git rebase` moves or **replays commits onto a new base commit**.

Suppose:

```text
A---B---C        main
     \
      D---E      feature
```

You run:

```bash
# Replay feature commits on top of the latest main.
git switch feature
git rebase main
```

Git effectively takes `D` and `E`, temporarily removes them, and replays their changes on top of `C`:

```text
A---B---C---D'---E'    feature
```

Notice:

```text
D → D'
E → E'
```

They are **new commits**.

Their commit IDs change because a commit's identity depends on information such as its parent, tree, author/committer metadata, and message.

### Important

Rebase does **not move the original commits**.

It creates new commits containing the replayed changes.

Conceptually:

```text
Original:

A---B
     \
      D---E

After rebase:

A---B---C---D'---E'
```

The old `D` and `E` may eventually become unreachable and later be cleaned up by Git.

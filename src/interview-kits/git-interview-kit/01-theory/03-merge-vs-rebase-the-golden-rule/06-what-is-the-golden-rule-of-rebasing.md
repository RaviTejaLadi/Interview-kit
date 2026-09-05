# What is the Golden Rule of Rebasing?

The **Golden Rule of Rebasing** is:

> **Never rebase commits that other people may already have based their work on.**

In simpler terms:

> **Don't rebase commits that have already been pushed to a shared/public branch.**

Why?

Imagine:

```text
Remote:

A---B---C
     \
      D---E
```

Developer 1 has `D` and `E`.

If Developer 1 rebases:

```text
A---B---C---D'---E'
```

Now the remote and other developers may still know about:

```text
D---E
```

while Developer 1 has:

```text
D'---E'
```

Even though `D'` and `E'` contain similar changes, they are **different commits with different IDs**.

This can cause confusing history and require force-pushing.

### Important nuance

Rebasing a branch that **only you use** is generally safe.

For example:

```text
feature/ravi-login
```

if nobody else has based work on it, can normally be rebased.
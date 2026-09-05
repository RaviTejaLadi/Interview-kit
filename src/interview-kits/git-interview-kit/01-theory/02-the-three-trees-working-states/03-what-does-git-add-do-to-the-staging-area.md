# What does `git add` do to the Staging Area?

`git add` takes the **current content of a file from the Working Directory** and updates the **Index/Staging Area** with that content.

Example:

```bash
# Stage the current version of app.js.
git add app.js
```

Before:

```text
HEAD       → old app.js
Index      → old app.js
Working    → new app.js
```

After `git add`:

```text
HEAD       → old app.js
Index      → new app.js
Working    → new app.js
```

Then:

```bash
# Commit the staged snapshot.
git commit -m "Update app"
```

After the commit:

```text
HEAD       → new app.js
Index      → new app.js
Working    → new app.js
```

### Important point

`git add` does **not** mean "add this file permanently to Git."

It means:

> **Update the staging area with the current version of this path.**

This is why you can do:

```bash
# Stage the current version of app.js.
git add app.js

# Modify app.js again after staging.
```

Now:

```text
Index         → Version 1
Working Tree  → Version 2
```

The next commit will contain **Version 1**, not Version 2.

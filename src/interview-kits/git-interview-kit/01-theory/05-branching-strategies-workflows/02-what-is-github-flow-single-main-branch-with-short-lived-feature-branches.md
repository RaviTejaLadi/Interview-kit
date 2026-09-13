# What is GitHub Flow?

**GitHub Flow** is a simpler branching model centered around a single long-lived `main` branch.

The basic workflow is:

```text
main
  │
  ├── feature branch
  │        ↓
  │      Pull Request
  │        ↓
  └────── main
```

Typical process:

1. Start from `main`.
2. Create a short-lived branch.
3. Make your changes.
4. Push the branch.
5. Open a Pull Request.
6. Review and test the changes.
7. Merge into `main`.
8. Deploy.

Example:

```bash
# Create a short-lived feature branch from main.
git switch main
git pull
git switch -c feature/login
```

After development:

```bash
# Push the feature branch to the remote repository.
git push -u origin feature/login
```

Then you create a PR.

### GitHub Flow vs GitFlow

```text
GitFlow:

feature → develop → release → main


GitHub Flow:

feature → PR → main
```

GitHub Flow is much simpler and works particularly well when `main` is **always deployable**.

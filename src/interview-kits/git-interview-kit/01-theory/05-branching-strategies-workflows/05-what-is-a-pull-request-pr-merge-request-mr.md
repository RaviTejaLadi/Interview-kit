# What is a Pull Request (PR) / Merge Request (MR)?

A **Pull Request (PR)** or **Merge Request (MR)** is a collaboration mechanism used to propose merging changes from one branch into another branch.

The terminology differs by platform:

* **GitHub / Bitbucket:** Pull Request (PR)
* **GitLab:** Merge Request (MR)

They serve essentially the same purpose.

Example:

```text
feature/login
      │
      │ Pull Request
      ↓
    main
```

A PR/MR typically provides:

* code diff
* discussion/comments
* code review
* automated CI checks
* approvals
* commit history
* merge controls

Typical workflow:

```text
Developer
    ↓
Create feature branch
    ↓
Write code
    ↓
Push branch
    ↓
Create PR/MR
    ↓
Code Review
    ↓
CI Tests
    ↓
Approval
    ↓
Merge
    ↓
main
    ↓
Deploy
```

### Example

Suppose:

```text
main
  │
  └── feature/login
```

You push:

```bash
# Push the feature branch so the remote repository can create a PR/MR from it.
git push -u origin feature/login
```

Then the PR might contain:

```text
Title:
Add user login

Changes:
+ Login form
+ Authentication API integration
+ Error handling
+ Tests
```

Reviewers can comment:

```text
"Can we add a test for an invalid password?"
```

The developer makes the change, pushes again, and the PR updates automatically.

---

# Quick Comparison

| Strategy                    | Main idea                                     | Branch lifetime | Best suited for                      |
| --------------------------- | --------------------------------------------- | --------------: | ------------------------------------ |
| **GitFlow**                 | Multiple structured branches                  |            Long | Scheduled/formal releases            |
| **GitHub Flow**             | `main` + short-lived branches                 |           Short | Web apps and continuous deployment   |
| **Trunk-Based Development** | Frequent integration into `main`              |      Very short | Modern CI/CD and continuous delivery |
| **Feature Flags**           | Hide incomplete features behind configuration |             N/A | Making TBD practical                 |

### Easy way to remember

```text
GitFlow
Feature → Develop → Release → Main
              ↓
           Hotfix


GitHub Flow
Feature → PR → Main


Trunk-Based Development
Small change → Main → CI/CD → Deploy


Feature Flags
Code → Main
        │
        └── Feature OFF → users don't see it
            Feature ON  → users see it
```

**Interview takeaway:** GitFlow optimizes for **release management**, GitHub Flow optimizes for **simple collaboration**, and Trunk-Based Development optimizes for **frequent integration and continuous delivery**.

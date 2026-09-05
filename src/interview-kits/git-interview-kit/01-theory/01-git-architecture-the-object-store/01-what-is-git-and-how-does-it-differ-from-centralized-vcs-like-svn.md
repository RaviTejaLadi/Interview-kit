# What is Git and how does it differ from centralized VCS like SVN?

**Git** is a **distributed version control system (DVCS)** used to track changes in source code and collaborate with other developers.

In Git, every developer's clone contains the **complete repository history**, including commits, branches, and Git objects.

### Git vs SVN

| Git                                    | SVN                                          |
| -------------------------------------- | -------------------------------------------- |
| Distributed VCS                        | Centralized VCS                              |
| Every clone has repository history     | Main history is stored on the central server |
| Most operations work offline           | Many operations depend on the server         |
| Branches are lightweight references    | Branches are generally more heavyweight      |
| Commit can happen locally              | Commit usually requires the central server   |
| Easy to create multiple local branches | Branch management is more centralized        |

### Simple analogy

**SVN:**

```text
Developer → Central SVN Server
Developer → Central SVN Server
Developer → Central SVN Server
```

**Git:**

```text
             Git Server
            /     |     \
        Clone   Clone   Clone
          ↓       ↓       ↓
       Complete Complete Complete
       History  History  History
```

So, if the Git server is temporarily unavailable, you can still **commit, branch, inspect history, diff, and perform many other operations locally**.
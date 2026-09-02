# 🐙 Git Interview Questions

---

# 📚 PART 1 — THEORY QUESTIONS

---

## 1. Git Architecture & The Object Store ⭐⭐⭐⭐⭐

### Must Know

1. What is Git and how does it differ from centralized VCS (like SVN)?
2. What is a content-addressable filesystem?
3. What is the `.git` folder and what does it store?
4. What are the 4 core Git Objects?
   - **Blob:** Stores raw file content.
   - **Tree:** Represents directories and maps file names/permissions to blobs.
   - **Commit:** Points to root tree, parents, author, committer, and message.
   - **Annotated Tag:** Permanent reference to a specific commit with signature.
5. How does Git use SHA-1 (and SHA-256) cryptographic hashing?
6. What is a Git branch under the hood? (Just a 41-byte pointer file pointing to a commit SHA!).
7. What is `HEAD` and where does it point?

---

## 2. The Three Trees & Working States ⭐⭐⭐⭐⭐

### Must Know

1. What are the Three Trees / Areas of Git?
   - **Working Directory:** Untracked/modified local files.
   - **Staging Area (Index):** Snapshot prepared for the next commit.
   - **Commit History (HEAD):** Permanent repository record.
2. What does `git status` check?
3. What does `git add` do to the Staging Area?
4. What is the difference between `git diff` and `git diff --staged`?
5. What is `.gitignore` and how do you ignore files that were already tracked?

---

## 3. Merge vs Rebase & The Golden Rule ⭐⭐⭐⭐⭐

### Must Know

1. What is `git merge` and what is a 3-way merge commit?
2. What is a Fast-Forward merge?
3. What is `git rebase` and how does it rewrite commit history?
4. Merge vs Rebase: Pros, cons, and trade-offs.
5. When should you use Merge vs Rebase?
6. What is **The Golden Rule of Rebasing**?
   - _Never rebase commits that have been pushed to a public/shared branch!_
7. What is commit squashing?
8. What is `git push --force-with-lease` vs `git push --force`?

---

## 4. Undoing Changes: Reset, Revert & Restore ⭐⭐⭐⭐⭐

### Must Know

1. What does `git reset` do?
2. What is the difference between:
   - `git reset --soft` (moves HEAD only; staging and working dir untouched)
   - `git reset --mixed` (moves HEAD and clears staging; working dir untouched)
   - `git reset --hard` (moves HEAD, clears staging, and **overwrites working directory**)
3. What is `git revert` and how does it differ from `git reset`?
4. Why is `git revert` the only safe way to undo commits on shared/production branches?
5. What does `git restore` do (restoring files in working dir or un-staging)?
6. What does `git clean -fd` do?

---

## 5. Branching Strategies & Workflows ⭐⭐⭐⭐

### Must Know

1. What is **GitFlow** and what are its branches (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`)?
2. What is **GitHub Flow** (single `main` branch with short-lived feature branches)?
3. What is **Trunk-Based Development** and why is it preferred in modern CI/CD teams?
4. How do Feature Flags enable Trunk-Based Development?
5. What is a Pull Request (PR) / Merge Request (MR)?

---

## 6. Disaster Recovery: Reflog, Detached HEAD & Cherry-Pick ⭐⭐⭐⭐⭐

### Must Know

1. What is the Git Reference Log (`git reflog`)?
2. How does `git reflog` record changes to HEAD?
3. Can you recover a commit deleted with `git reset --hard`? (Yes, via `reflog`).
4. What is a **Detached HEAD** state and how do you escape it safely?
5. What is `git cherry-pick` and when should you use it?
6. What is `git stash` and how does `git stash pop` vs `apply` work?
7. What is `git bisect` and how does binary search track down regression bugs?

---

# 💻 PART 2 — PRACTICAL CLI SCENARIOS

---

## 7. History Manipulation & Rebasing ⭐⭐⭐⭐⭐

### Must Execute / Master

1. Perform an interactive rebase (`git rebase -i HEAD~4`) to squash 3 minor commits into 1 clean commit.
2. Reword an old commit message using interactive rebase.
3. Split a single large commit into two separate commits using `edit`.
4. Rebase a feature branch onto updated `main` and resolve all conflicts.

---

## 8. Conflict Resolution & Branch Operations ⭐⭐⭐⭐⭐

### Must Execute / Master

1. Resolve merge conflicts manually by reading conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), staging, and completing merge/rebase.
2. Cherry-pick a specific hotfix commit from `main` to a release branch.
3. Stash uncommitted changes with a message, switch branches, and re-apply stashed changes.
4. Rename a local and remote branch cleanly.

---

## 9. Disaster Recovery Scenarios ⭐⭐⭐⭐⭐

### Must Execute / Master

1. **Accidental Hard Reset Recovery:** Recover from an accidental `git reset --hard HEAD~3` using `git reflog` and restoring branch pointers.
2. **Deleted Branch Recovery:** Restore a branch that was accidentally deleted with `git branch -D <branch>`.
3. **Detached HEAD Fix:** Save commits created in a detached HEAD state by creating a new branch before switching.
4. **Revert a Bad Merge Commit:** Safely revert a faulty merge commit with `git revert -m 1 <commit>`.

---

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

---

## 10. `git reset` Flag Matrix ⭐⭐⭐⭐⭐

```text
Command                  Moves HEAD?    Modifies Index?    Modifies Working Tree?
---------------------------------------------------------------------------------
git reset --soft         ✅ YES         ❌ NO              ❌ NO
git reset --mixed        ✅ YES         ✅ YES             ❌ NO
git reset --hard         ✅ YES         ✅ YES             ✅ YES (Destructive!)
```

---

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. 4 Git object types (Blob, Tree, Commit, Tag)
2. What a Git branch really is
3. Three trees (Working Directory, Staging, HEAD)
4. `git merge` vs `git rebase`
5. Fast-Forward merge
6. The Golden Rule of Rebasing
7. `git reset` (`--soft`, `--mixed`, `--hard`)
8. `git reset` vs `git revert`
9. Why `git revert` is safe for public branches
10. `git reflog` audit mechanism
11. Detached HEAD explanation
12. `git cherry-pick`
13. `git stash pop` vs `apply`
14. GitFlow vs Trunk-Based Development
15. `git push --force-with-lease` vs `--force`

### 💻 Practical CLI

16. Interactive rebase to squash commits (`git rebase -i`)
17. Resolving merge conflicts step-by-step
18. Recovering lost commits using `git reflog`
19. Stashing changes with `git stash push -m`
20. Undoing the last commit while keeping changes staged (`git reset --soft HEAD~1`)
21. Cherry-picking a single commit
22. Recovering a deleted branch
23. Using `git bisect` to locate a bug
24. Untracking a file from git while keeping it locally (`git rm --cached`)
25. Reverting a public merge commit

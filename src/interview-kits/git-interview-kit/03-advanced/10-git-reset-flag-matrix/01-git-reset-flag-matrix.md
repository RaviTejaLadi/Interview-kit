# `git reset` Flag Matrix

```text
Command                  Moves HEAD?    Modifies Index?    Modifies Working Tree?
---------------------------------------------------------------------------------
git reset --soft         ✅ YES         ❌ NO              ❌ NO
git reset --mixed        ✅ YES         ✅ YES             ❌ NO
git reset --hard         ✅ YES         ✅ YES             ✅ YES (Destructive!)
```

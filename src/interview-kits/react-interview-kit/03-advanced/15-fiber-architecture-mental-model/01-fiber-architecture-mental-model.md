# Fiber Architecture Mental Model

You must be able to explain:

```text
Render Phase (Interruptible, asynchronous work)
   ├── Diff Virtual DOM trees
   ├── Build WorkInProgress Fiber Tree
   └── Tag Fibers (Placement, Update, Deletion)
Commit Phase (Uninterruptible, synchronous work)
   ├── Mutate host DOM
   ├── Run useLayoutEffect synchronously
   └── Schedule and run useEffect asynchronously
```

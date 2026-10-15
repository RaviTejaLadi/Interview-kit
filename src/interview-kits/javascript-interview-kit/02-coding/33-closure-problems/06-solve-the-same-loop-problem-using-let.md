# Solve the same loop problem using `let`.

Problem: Fix the loop closure problem without using an IIFE.

### Code example

```
// Use let to create a separate binding for each loop iteration.
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

Output:

```
0
1
2
```

### Why does `let` work?

Unlike `var`, `let` is block-scoped. In a traditional `for` loop, JavaScript creates a distinct binding for each iteration when the loop body closes over the loop variable.

Each callback therefore remembers its own iteration's value.

| Feature                             | `var`                      | `let`                      |
| ----------------------------------- | -------------------------- | -------------------------- |
| Scope                               | Function-scoped            | Block-scoped               |
| Separate binding per loop iteration | No                         | Yes, for this loop pattern |
| Output in the example               | `3, 3, 3`                  | `0, 1, 2`                  |
| Requires IIFE to fix this example   | Yes, or another workaround | No                         |

Recommendation: Prefer `let` or `const` over `var` in modern JavaScript. For this loop problem, `let` is the simplest and most readable solution.

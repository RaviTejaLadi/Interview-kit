# What is recursion?

**Recursion** is a technique where a function calls itself to solve a problem.

A recursive function normally needs:

1. **Base case** — stops the recursion.
2. **Recursive case** — calls itself with a smaller/simpler problem.

Example: factorial.

```javascript
// Recursion calculates factorial by reducing the problem each time.
function factorial(n) {
  if (n <= 1) {
    return 1; // Base case
  }

  return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // 120
```

Execution:

```text
factorial(5)
  ↓
5 × factorial(4)
  ↓
5 × 4 × factorial(3)
  ↓
5 × 4 × 3 × factorial(2)
  ↓
5 × 4 × 3 × 2 × factorial(1)
  ↓
120
```

⚠️ Without a proper base case, recursion can cause a **stack overflow**.

# Find the factorial of a number

The factorial of a non-negative integer (n) is the product of all positive integers from `1` to `n`.

For example:

[ 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120 ]

By definition, (0! = 1).

### Without built-in methods

// Calculate factorial using a loop.

```
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Enter a non-negative integer");
  }

  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
```

Explanation:

- Initialize `result` to `1`.
- Multiply it by every integer from `2` through `n`.
- For `n = 0` or `n = 1`, the loop doesn't run, so the result remains `1`.

### With a recursive approach

// Calculate factorial by calling the same function with a smaller number.

```
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Enter a non-negative integer");
  }

  // Base case: stop when n reaches zero.
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case: n! = n * (n - 1)!
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

Explanation:

- The base case stops the recursive calls.
- The recursive case multiplies `n` by the factorial of `n - 1`.
- For example, `factorial(5)` becomes `5 * 4 * 3 * 2 * 1`.

The recursive solution is not a built-in-method solution; it demonstrates an alternative algorithmic technique. JavaScript has no standard built-in factorial function.

Gotcha: JavaScript's `Number` type cannot represent arbitrarily large integers exactly. Use `BigInt` if you need exact large factorials.

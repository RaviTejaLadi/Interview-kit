# Generate Fibonacci numbers.

In the Fibonacci sequence, each number is the sum of the previous two numbers.

Example: For `n = 7`:

`[0, 1, 1, 2, 3, 5, 8]`

### Without built-in methods

// Generate the first n Fibonacci numbers using a loop.

```
function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Enter a non-negative integer");
  }

  const result = [];

  let first = 0;
  let second = 1;

  for (let i = 0; i < n; i++) {
    result[result.length] = first;

    // Calculate the next Fibonacci number.
    const next = first + second;
    first = second;
    second = next;
  }

  return result;
}

console.log(fibonacci(7)); // [0, 1, 1, 2, 3, 5, 8]
```

Explanation:

- Start with `first = 0` and `second = 1`.
- Add the current `first` value to the result.
- Calculate the next value by adding `first + second`.
- Move both variables forward.
- Repeat until `n` numbers have been generated.

### With built-in methods

// Use Array.from() to generate the sequence from an index-based formula.

```
function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Enter a non-negative integer");
  }

  const result = [];

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      result.push(0);
    } else if (i === 1) {
      result.push(1);
    } else {
      result.push(result[i - 1] + result[i - 2]);
    }
  }

  return result;
}

console.log(fibonacci(7)); // [0, 1, 1, 2, 3, 5, 8]
```

Explanation:

- `push()` appends each new number to the result.
- The first two values are `0` and `1`.
- Every later value is calculated by adding the two preceding values.

This version uses the built-in array method `push()`. Both solutions use \\(O(n)\\) time and \\(O(n)\\) space to return the sequence.

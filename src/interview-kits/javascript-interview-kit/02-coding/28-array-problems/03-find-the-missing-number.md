# Find the missing number.

Input: `[1, 2, 4, 5, 6]`

Output: `3`

Assumption: The array contains distinct numbers from `1` through `n`, with exactly one number missing.

### With built-in methods

```
// Find the missing number using the arithmetic sum formula.
function findMissingNumber(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
}

console.log(findMissingNumber([1, 2, 4, 5, 6], 6));
// 3
```

Explanation: The sum of numbers from `1` to `n` is \\(n(n+1)/2\\). Subtract the actual sum to get the missing number.

### Without built-in methods

```
// Find the missing number using a loop.
function findMissingNumber(arr, n) {
  let expectedSum = 0;
  let actualSum = 0;

  for (let i = 1; i <= n; i++) {
    expectedSum += i;
  }

  for (let i = 0; i < arr.length; i++) {
    actualSum += arr[i];
  }

  return expectedSum - actualSum;
}

console.log(findMissingNumber([1, 2, 4, 5, 6], 6));
// 3
```

Explanation: Calculate the expected sum and actual sum manually, then subtract them.

Complexity: Both approaches take \\(O(n)\\) time and \\(O(1)\\) extra space, excluding input storage.

Interview tip: Clarify whether the sequence starts at `0` or `1`, and whether one or multiple numbers can be missing.

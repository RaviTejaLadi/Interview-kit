# Find the maximum subarray sum.

Find the largest sum of any contiguous, non-empty subarray.

Input: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`

Output: `6`

The maximum-sum subarray is `[4, -1, 2, 1]`, whose sum is `6`.

### With built-in methods

There isn't a single standard JavaScript built-in method for finding the maximum subarray sum. We can use a loop and the `Math.max()` method.

```
// Find the maximum subarray sum using Kadane's algorithm.
function maxSubarraySum(arr) {
  if (arr.length === 0) return null;

  let currentSum = arr[0];
  let maxSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// 6
```

Explanation: At every position, decide whether to start a new subarray or extend the existing one. Track the largest sum found so far.

### Without built-in methods

```
// Find the maximum subarray sum using manual comparisons.
function maxSubarraySum(arr) {
  if (arr.length === 0) return null;

  let currentSum = arr[0];
  let maxSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (currentSum + arr[i] > arr[i]) {
      currentSum = currentSum + arr[i];
    } else {
      currentSum = arr[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// 6
```

Explanation: This implements Kadane's algorithm without `Math.max()`. If extending the current subarray is worse than starting fresh, reset the current sum to the current element.

Complexity: Both approaches take (O(n)) time and (O(1)) extra space.

Interview tip: Initialize both sums with the first element, not `0`. This correctly handles arrays containing only negative numbers.

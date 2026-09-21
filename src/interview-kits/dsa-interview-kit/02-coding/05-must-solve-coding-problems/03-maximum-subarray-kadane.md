# Maximum Subarray (Kadane's Algorithm)

Find the contiguous subarray with the largest sum and return its sum.

## Approach

At each index, decide whether to extend the previous subarray or start a new one at current value.

- Time: `O(n)`
- Space: `O(1)`

```javascript
function maxSubArray(nums) {
  let best = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}
```

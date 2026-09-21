# Two Sum

Given an array `nums` and target `target`, return indices of two numbers such that they add up to target.

## Approach

Use a hash map to store `value -> index` as you iterate. For each value, check whether `target - value` was seen before.

- Time: `O(n)`
- Space: `O(n)`

```javascript
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(nums[i], i);
  }

  return [];
}
```

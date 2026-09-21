# Binary Search in Sorted Array

Given a sorted array and target, return the index of target, or `-1` if not found.

## Approach

Maintain `left` and `right`. Repeatedly inspect middle element and discard half of search space.

- Time: `O(log n)`
- Space: `O(1)`

```javascript
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

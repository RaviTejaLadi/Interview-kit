# Reverse an array.

Input: `[1, 2, 3, 4, 5]`

Output: `[5, 4, 3, 2, 1]`

### With built-in methods

```
// Reverse a copy of the array.
function reverseArray(arr) {
  return [...arr].reverse();
}

console.log(reverseArray([1, 2, 3, 4, 5]));
// [5, 4, 3, 2, 1]
```

Explanation: `reverse()` reverses the array in place, so `[...arr]` creates a copy to avoid modifying the original.

### Without built-in methods

```
// Reverse an array using two pointers.
function reverseArray(arr) {
  const result = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    result[result.length] = arr[i];
  }

  return result;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
// [5, 4, 3, 2, 1]
```

Explanation: Traverse the array from the last index to the first and copy each element into a new array.

Complexity: Both approaches take (O(n)) time. The examples use (O(n)) extra space.

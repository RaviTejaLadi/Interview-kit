# Merge two sorted arrays.

Combine two sorted arrays into one sorted array.

Input: `[1, 3, 5]` and `[2, 4, 6]`

Output: `[1, 2, 3, 4, 5, 6]`

### With built-in methods

```
// Merge two arrays and sort the combined result.
function mergeSortedArrays(arr1, arr2) {
  return [...arr1, ...arr2].sort((a, b) => a - b);
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
// [1, 2, 3, 4, 5, 6]
```

Explanation: Combine both arrays using the spread operator and sort the result in ascending order.

### Without built-in methods

```
// Merge sorted arrays using two pointers.
function mergeSortedArrays(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result[result.length] = arr1[i];
      i++;
    } else {
      result[result.length] = arr2[j];
      j++;
    }
  }

  while (i < arr1.length) {
    result[result.length] = arr1[i];
    i++;
  }

  while (j < arr2.length) {
    result[result.length] = arr2[j];
    j++;
  }

  return result;
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
// [1, 2, 3, 4, 5, 6]
```

Explanation:

1. Compare the current elements of both arrays.
2. Append the smaller element to the result.
3. Advance the corresponding pointer.
4. Append any remaining elements.

Complexity: Built-in approach: \\(O((n+m)\log(n+m))\\). Manual approach: \\(O(n+m)\\).

Interview tip: The two-pointer solution is preferred because both input arrays are already sorted.

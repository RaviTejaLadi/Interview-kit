# Find the union of two arrays.

The union contains all unique elements from both arrays.

Input: `[1, 2, 3]` and `[3, 4, 5]`

Output: `[1, 2, 3, 4, 5]`

### With built-in methods

```
// Find the union using Set and the spread operator.
function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

console.log(union([1, 2, 3], [3, 4, 5]));
// [1, 2, 3, 4, 5]
```

Explanation: Combine both arrays, then use `Set` to remove duplicates.

### Without built-in methods

```
// Find the union using loops and strict equality.
function union(arr1, arr2) {
  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    result[result.length] = arr1[i];
  }

  for (let i = 0; i < arr2.length; i++) {
    let found = false;

    for (let j = 0; j < result.length; j++) {
      if (arr2[i] === result[j]) {
        found = true;
        break;
      }
    }

    if (!found) {
      result[result.length] = arr2[i];
    }
  }

  // Remove duplicates already present in the first array.
  const unique = [];

  for (let i = 0; i < result.length; i++) {
    let found = false;

    for (let j = 0; j < unique.length; j++) {
      if (result[i] === unique[j]) {
        found = true;
        break;
      }
    }

    if (!found) unique[unique.length] = result[i];
  }

  return unique;
}

console.log(union([1, 2, 3], [3, 4, 5]));
// [1, 2, 3, 4, 5]
```

Explanation: Copy the first array, append the second array's elements, and manually remove repeated values.

Complexity: Built-in approach: typically \\(O(n+m)\\). Manual approach: \\(O((n+m)^2)\\) time.

# Remove duplicates from an array.

Input: `[1, 2, 2, 3, 4, 4, 5]`

Output: `[1, 2, 3, 4, 5]`

### With built-in methods

```
// Remove duplicate values using Set.
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// [1, 2, 3, 4, 5]
```

Explanation: `Set` stores unique values. The spread operator converts the set back into an array.

### Without built-in methods

```
// Remove duplicates using nested loops.
function removeDuplicates(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let found = false;

    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        found = true;
        break;
      }
    }

    if (!found) {
      result[result.length] = arr[i];
    }
  }

  return result;
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// [1, 2, 3, 4, 5]
```

Explanation: For each element, check whether it already exists in the result. Add it only if it does not.

Complexity: Built-in approach: typically (O(n)) time. Manual approach: (O(n^2)) time.

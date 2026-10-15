# Find the intersection of two arrays.

The intersection contains elements present in both arrays.

Input: `[1, 2, 3, 4]` and `[3, 4, 5, 6]`

Output: `[3, 4]`

### With built-in methods

```
// Find common unique elements using filter and Set.
function intersection(arr1, arr2) {
  const secondSet = new Set(arr2);

  return [...new Set(arr1)].filter((num) => secondSet.has(num));
}

console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6]));
// [3, 4]
```

Explanation: Create a set from the second array, then filter the unique elements of the first array to retain only common values.

### Without built-in methods

```
// Find common unique elements using nested loops.
function intersection(arr1, arr2) {
  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    let existsInSecond = false;
    let alreadyAdded = false;

    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        existsInSecond = true;
        break;
      }
    }

    for (let k = 0; k < result.length; k++) {
      if (result[k] === arr1[i]) {
        alreadyAdded = true;
        break;
      }
    }

    if (existsInSecond && !alreadyAdded) {
      result[result.length] = arr1[i];
    }
  }

  return result;
}

console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6]));
// [3, 4]
```

Explanation: Check whether each element of the first array exists in the second array. Add it only if it hasn't already been added.

Complexity: Built-in approach: typically (O(n+m)). Manual approach: (O(nm)) time, where (n) and (m) are the array lengths.

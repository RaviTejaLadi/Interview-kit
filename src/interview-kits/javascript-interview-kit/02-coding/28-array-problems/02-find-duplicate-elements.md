# Find duplicate elements.

Input: `[1, 2, 3, 2, 4, 1, 5]`

Output: `[2, 1]`

Here, each duplicated value is returned only once, in the order it is first identified as a duplicate.

### With built-in methods

```
// Find duplicate values using Set and filter.
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  arr.forEach((num) => {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  });

  return [...duplicates];
}

console.log(findDuplicates([1, 2, 3, 2, 4, 1, 5]));
// [2, 1]
```

Explanation: `seen` tracks values already encountered. `duplicates` stores values encountered more than once.

### Without built-in methods

```
// Find duplicate values using nested loops.
function findDuplicates(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let alreadyAdded = false;

    for (let k = 0; k < result.length; k++) {
      if (result[k] === arr[i]) {
        alreadyAdded = true;
        break;
      }
    }

    if (alreadyAdded) continue;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        result[result.length] = arr[i];
        break;
      }
    }
  }

  return result;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 1, 5]));
// [1, 2]
```

Explanation: Check whether each element appears again later. If it does, add it once to the result.

The order differs between the two implementations because they use different discovery rules. Both correctly identify the duplicated values.

Complexity: Built-in approach: typically \\(O(n)\\) time. Manual approach: \\(O(n^2)\\) time.

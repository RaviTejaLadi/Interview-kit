# Flatten a nested array.

Flattening converts a nested array into a single-level array.

Input: `[1, [2, [3, 4]], 5]`

Output: `[1, 2, 3, 4, 5]`

### With built-in methods

```
// Flatten all nested levels using flat.
function flattenArray(arr) {
  return arr.flat(Infinity);
}

console.log(flattenArray([1, [2, [3, 4]], 5]));
// [1, 2, 3, 4, 5]
```

Explanation: `flat(Infinity)` recursively flattens all nesting levels.

### Without built-in methods

```
// Flatten nested arrays recursively without flat.
function flattenArray(arr) {
  const result = [];

  function flatten(items) {
    for (let i = 0; i < items.length; i++) {
      if (Array.isArray(items[i])) {
        flatten(items[i]);
      } else {
        result[result.length] = items[i];
      }
    }
  }

  flatten(arr);
  return result;
}

console.log(flattenArray([1, [2, [3, 4]], 5]));
// [1, 2, 3, 4, 5]
```

Explanation: If an element is an array, process its contents recursively. Otherwise, append the element to the result.

Complexity: (O(n)) time and (O(n)) output space, where (n) is the total number of elements across all nesting levels. Recursive calls also use stack space.

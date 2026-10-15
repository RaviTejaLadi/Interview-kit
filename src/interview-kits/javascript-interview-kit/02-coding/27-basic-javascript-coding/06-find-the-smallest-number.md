# Find the smallest number.

Example: `[10, 5, 30, 20]` → `5`

### Without built-in methods

// Find the smallest number using a loop.

```
function findSmallest(arr) {
  if (arr.length === 0) {
    return undefined;
  }

  let smallest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return smallest;
}

console.log(findSmallest([10, 5, 30, 20])); // 5
```

Explanation:

- Assume the first element is the smallest.
- Compare every remaining element with `smallest`.
- Update it whenever a smaller number is found.

### With built-in methods

// Find the minimum using Math.min().

```
function findSmallest(arr) {
  if (arr.length === 0) {
    return undefined;
  }

  return Math.min(...arr);
}

console.log(findSmallest([10, 5, 30, 20])); // 5
```

Explanation: `Math.min()` returns the smallest of the supplied numbers. The spread operator passes the array elements as individual arguments.

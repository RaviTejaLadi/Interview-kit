# Find the largest number in an array.

Example: `[10, 5, 30, 20]` → `30`

### Without built-in methods

// Track the largest value while looping.

```
function findLargest(arr) {
  if (arr.length === 0) {
    return undefined;
  }

  let largest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }

  return largest;
}

console.log(findLargest([10, 5, 30, 20])); // 30
```

Explanation:

- Assume the first number is the largest.
- Compare every remaining number with it.
- Update `largest` whenever a bigger number is found.

### With built-in methods

// Use Math.max() with the array elements.

```
function findLargest(arr) {
  if (arr.length === 0) {
    return undefined;
  }

  return Math.max(...arr);
}

console.log(findLargest([10, 5, 30, 20])); // 30
```

Explanation: The spread operator (`...`) passes each array element as an argument to `Math.max()`.

Gotcha: Spreading a very large array into a function can exceed the engine's argument limit. The loop-based version avoids that issue.

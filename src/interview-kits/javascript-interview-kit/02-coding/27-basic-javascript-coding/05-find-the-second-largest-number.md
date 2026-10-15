# Find the second-largest number.

Example: `[10, 5, 30, 20]` → `20`

Here, second-largest means the second-largest distinct value. For `[10, 30, 30]`, the answer is `10`.

### Without built-in methods

// Track the largest and second-largest distinct values.

```
function findSecondLargest(arr) {
  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num < largest && num > secondLargest) {
      secondLargest = num;
    }
  }

  // Return undefined if no second distinct value exists.
  return secondLargest === -Infinity
    ? undefined
    : secondLargest;
}

console.log(findSecondLargest([10, 5, 30, 20])); // 20
console.log(findSecondLargest([30, 30]));        // undefined
```

Explanation:

- `largest` stores the biggest number found so far.
- `secondLargest` stores the next biggest distinct number.
- When a new largest number appears, the previous largest becomes the second-largest.
- Duplicate copies of the largest number are ignored.

### With built-in methods

// Remove duplicates, sort descending, and select the second value.

```
function findSecondLargest(arr) {
  const unique = [...new Set(arr)];
  unique.sort((a, b) => b - a);

  return unique.length >= 2 ? unique[1] : undefined;
}

console.log(findSecondLargest([10, 5, 30, 20])); // 20
```

Explanation:

- `Set` removes duplicate values.
- `sort((a, b) => b - a)` sorts numbers in descending order.
- Index `1` contains the second-largest value.

Note: The first solution is \\(O(n)\\) time. The built-in solution is typically \\(O(n \log n)\\) due to sorting.

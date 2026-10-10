# Find the second-largest number.

Input: `[10, 5, 20, 8, 20, 15]`

Output: `15`

We’ll find the second-largest distinct number, ignoring repeated maximum values.

### With built-in methods

```
// Find the second-largest distinct number using Set and sort.
function secondLargest(arr) {
  const unique = [...new Set(arr)];

  unique.sort((a, b) => b - a);

  return unique.length < 2 ? null : unique[1];
}

console.log(secondLargest([10, 5, 20, 8, 20, 15]));
// 15
```

Explanation: Remove duplicates, sort the numbers in descending order, and return the second element.

### Without built-in methods

```
// Find the second-largest distinct number using one loop.
function secondLargest(arr) {
  let largest = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > largest) {
      second = largest;
      largest = num;
    } else if (num < largest && num > second) {
      second = num;
    }
  }

  return second === -Infinity ? null : second;
}

console.log(secondLargest([10, 5, 20, 8, 20, 15]));
// 15
```

Explanation: Maintain two variables. When a new maximum appears, move the previous maximum into `second`. Otherwise, update `second` when the current number falls between the two values.

Complexity: Built-in approach: \\(O(n \log n)\\) time. Manual approach: \\(O(n)\\) time.

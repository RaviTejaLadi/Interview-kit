# Find pairs that add up to a target.

Find pairs of numbers whose sum equals a target. Each value pair is returned once.

Input: `[2, 4, 3, 5, 7, 8, 1]`, target `9`

Output: `[[2, 7], [4, 5], [8, 1]]`

### With built-in methods

```
// Find unique value pairs using Set.
function findPairs(arr, target) {
  const seen = new Set();
  const pairs = new Set();

  for (const num of arr) {
    const complement = target - num;

    if (seen.has(complement)) {
      const low = Math.min(num, complement);
      const high = Math.max(num, complement);

      pairs.add(JSON.stringify([low, high]));
    }

    seen.add(num);
  }

  return [...pairs].map((pair) => JSON.parse(pair));
}

console.log(findPairs([2, 4, 3, 5, 7, 8, 1], 9));
// [[2, 7], [4, 5], [1, 8]]
```

Explanation: For each number, calculate its complement (`target - num`). If that complement has already appeared, a pair has been found. The set prevents duplicate value pairs.

### Without built-in methods

```
// Find unique value pairs using nested loops.
function findPairs(arr, target) {
  const pairs = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        const low = Math.min(arr[i], arr[j]);
        const high = Math.max(arr[i], arr[j]);

        let found = false;

        for (let k = 0; k < pairs.length; k++) {
          if (pairs[k][0] === low && pairs[k][1] === high) {
            found = true;
            break;
          }
        }

        if (!found) {
          pairs[pairs.length] = [low, high];
        }
      }
    }
  }

  return pairs;
}

console.log(findPairs([2, 4, 3, 5, 7, 8, 1], 9));
// [[2, 7], [4, 5], [1, 8]]
```

Explanation: Compare every pair of elements. If their sum equals the target, add the normalized pair only if it hasn't been recorded already.

Complexity: Built-in approach: typically \\(O(n)\\) time for set operations. Manual approach: \\(O(n^2)\\) time.

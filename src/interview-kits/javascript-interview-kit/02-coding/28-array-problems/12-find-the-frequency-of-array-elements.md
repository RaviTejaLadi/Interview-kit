# Find the frequency of array elements.

Count how many times each element appears.

Input: `[1, 2, 2, 3, 1, 1, 4]`

Output: `{1: 3, 2: 2, 3: 1, 4: 1}`

### With built-in methods

```
// Count element frequencies using reduce.
function frequencyCount(arr) {
  return arr.reduce((frequency, num) => {
    frequency[num] = (frequency[num] || 0) + 1;
    return frequency;
  }, {});
}

console.log(frequencyCount([1, 2, 2, 3, 1, 1, 4]));
// { '1': 3, '2': 2, '3': 1, '4': 1 }
```

Explanation: `reduce()` builds an object. Each occurrence increments the corresponding count.

### Without built-in methods

```
// Count element frequencies using loops.
function frequencyCount(arr) {
  const frequency = {};

  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];

    if (frequency[key] === undefined) {
      frequency[key] = 1;
    } else {
      frequency[key]++;
    }
  }

  return frequency;
}

console.log(frequencyCount([1, 2, 2, 3, 1, 1, 4]));
// { '1': 3, '2': 2, '3': 1, '4': 1 }
```

Explanation: Visit each element. Initialize its count to `1` if it hasn't appeared before; otherwise, increment the existing count.

Complexity: Both approaches take \\(O(n)\\) expected time and \\(O(k)\\) space, where \\(k\\) is the number of distinct values.

Gotcha: These object-based solutions are intended for primitive values such as numbers and strings. Object keys are strings, so different types may collide (for example, numeric `1` and string `"1"`). Use a `Map` when you need type-aware keys.

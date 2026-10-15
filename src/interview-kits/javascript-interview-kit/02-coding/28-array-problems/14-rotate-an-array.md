# Rotate an array.

Rotate an array to the right by `k` positions.

Input: `[1, 2, 3, 4, 5, 6, 7]`, `k = 3`

Output: `[5, 6, 7, 1, 2, 3, 4]`

### With built-in methods

```
// Rotate an array right using slice and concatenation.
function rotateArray(arr, k) {
  if (arr.length === 0) return [];

  k = ((k % arr.length) + arr.length) % arr.length;

  return arr.slice(-k).concat(arr.slice(0, arr.length - k));
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3));
// [5, 6, 7, 1, 2, 3, 4]
```

Explanation: Take the last `k` elements and place them before the remaining elements. Normalize `k` so rotations larger than the array length work correctly.

### Without built-in methods

```
// Rotate an array right using loops and manual indexing.
function rotateArray(arr, k) {
  const n = arr.length;

  if (n === 0) return [];

  k = ((k % n) + n) % n;

  const result = [];

  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = arr[i];
  }

  return result;
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3));
// [5, 6, 7, 1, 2, 3, 4]
```

Explanation: Move each element from index `i` to index `(i + k) % n`. The modulo operator wraps elements around to the beginning.

Complexity: Both approaches take (O(n)) time and (O(n)) extra space.

Gotcha: The examples return a new array and do not mutate the input. They also support negative `k` values, which represent left rotations.

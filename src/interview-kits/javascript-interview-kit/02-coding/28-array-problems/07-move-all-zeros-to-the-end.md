# Move all zeros to the end.

Move all zeros to the end while preserving the order of non-zero elements.

Input: `[0, 1, 0, 3, 12]`

Output: `[1, 3, 12, 0, 0]`

### With built-in methods

```
// Move zeros using filter and array concatenation.
function moveZeros(arr) {
  const nonZeros = arr.filter((num) => num !== 0);
  const zeros = arr.filter((num) => num === 0);

  return nonZeros.concat(zeros);
}

console.log(moveZeros([0, 1, 0, 3, 12]));
// [1, 3, 12, 0, 0]
```

Explanation: Separate non-zero values and zeros, then concatenate them in the required order.

### Without built-in methods

```
// Move zeros using a write pointer and loops.
function moveZeros(arr) {
  const result = [];
  let index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      result[index] = arr[i];
      index++;
    }
  }

  while (index < arr.length) {
    result[index] = 0;
    index++;
  }

  return result;
}

console.log(moveZeros([0, 1, 0, 3, 12]));
// [1, 3, 12, 0, 0]
```

Explanation: Copy non-zero values first. Fill all remaining positions with zeros.

Complexity: Both approaches take (O(n)) time and (O(n)) extra space.

Interview tip: You can also solve this in place with a write pointer, using (O(1)) extra space.

# Find the sum of an array.

Example: `[10, 20, 30, 40]` → `100`

### Without built-in methods

// Add each number to a running total.

```
function sumArray(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

console.log(sumArray([10, 20, 30, 40])); // 100
```

Explanation:

- Initialize `sum` to `0`.
- Add each array element to `sum`.
- Return the final total.

### With built-in methods

// Calculate the total using reduce().

```
function sumArray(arr) {
  return arr.reduce((total, num) => total + num, 0);
}

console.log(sumArray([10, 20, 30, 40])); // 100
```

Explanation:

- `reduce()` processes each array element.
- `total` holds the accumulated sum.
- `num` is the current element.
- The initial value `0` ensures an empty array returns `0`.

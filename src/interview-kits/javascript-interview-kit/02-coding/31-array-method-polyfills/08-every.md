# `every()`

### What does `every()` do?

`every()` checks whether all elements satisfy a condition.

It returns:

- `true` if every existing element passes the test.
- `false` as soon as any element fails the test.

### Polyfill implementation

// Implement every() using a for loop.

```
Array.prototype.myEvery = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("myEvery called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array) {
      if (!callback.call(thisArg, array[i], i, array)) {
        return false;
      }
    }
  }

  return true;
};
```

### Example

// Check whether every number is positive.

```
const numbers = [2, 4, 6, 8];

const result = numbers.myEvery((num) => num > 0);

console.log(result); // true
```

Every number passes the condition, so the function returns `true`.

### Example when one element fails

// Check whether every number is even.

```
const numbers = [2, 4, 5, 8];

const result = numbers.myEvery((num) => num % 2 === 0);

console.log(result); // false
```

The callback returns `false` for `5`. The method stops immediately without checking `8`.

### Important edge case: Empty arrays

```
// Test some() and every() with an empty array.
console.log([].mySome(() => true));  // false
console.log([].myEvery(() => false)); // true
```

Why does `every()` return `true` for an empty array?

Because there is no element that violates the condition. This is called vacuous truth in logic and is intentional JavaScript behavior.

### Time complexity

- Best case: (O(1)), if the first element fails.
- Worst case: (O(n)).
- Extra space: (O(1)).

Interview takeaway: Use `every()` when you need to verify that all elements satisfy a condition.

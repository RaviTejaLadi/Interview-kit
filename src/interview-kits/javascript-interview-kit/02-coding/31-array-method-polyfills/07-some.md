# `some()`

### What does `some()` do?

`some()` checks whether at least one element satisfies a condition.

It returns a boolean:

- `true` if at least one element matches.
- `false` if no elements match.

It stops as soon as the callback returns a truthy value.

### Polyfill implementation

// Implement some() using a for loop.

```
Array.prototype.mySome = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("mySome called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array) {
      if (callback.call(thisArg, array[i], i, array)) {
        return true;
      }
    }
  }

  return false;
};
```

### Example

// Check whether an array contains an even number.

```
const numbers = [1, 3, 5, 8, 9];

const result = numbers.mySome((num) => num % 2 === 0);

console.log(result); // true
```

The callback checks `1`, `3`, `5`, and `8`. Because `8` is even, the function immediately returns `true`. It does not check `9`.

### Example when no element matches

// Check whether any number is negative.

```
const numbers = [1, 2, 3, 4];

const result = numbers.mySome((num) => num < 0);

console.log(result); // false
```

### Time complexity

- Best case: \\(O(1)\\).
- Worst case: \\(O(n)\\).
- Extra space: \\(O(1)\\).

Interview takeaway: Use `some()` when you need to know whether at least one element satisfies a condition.

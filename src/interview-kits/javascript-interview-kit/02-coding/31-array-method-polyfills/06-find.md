# `find()`

### What does `find()` do?

`find()` returns the first element that satisfies a condition. If no element matches, it returns `undefined`.

Unlike `filter()`, it stops immediately after finding a match.

### Polyfill implementation

// Implement find() and stop at the first matching element.

```
Array.prototype.myFind = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("myFind called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    // find() also visits sparse-array holes as undefined.
    const value = array[i];

    if (callback.call(thisArg, value, i, array)) {
      return value;
    }
  }

  return undefined;
};
```

### Example

// Find the first number greater than 10.

```
const numbers = [4, 7, 12, 18, 25];

const result = numbers.myFind((num) => num > 10);

console.log(result); // 12
```

The callback checks `4`, `7`, and `12`. Once `12` matches, the function returns immediately. It never checks `18` or `25`.

### Example with objects

// Find the user with the requested ID.

```
const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Teja" },
  { id: 3, name: "Kiran" },
];

const user = users.myFind((item) => item.id === 2);

console.log(user);
// { id: 2, name: "Teja" }
```

### `find()` vs `filter()`

| `find()`                        | `filter()`                   |
| ------------------------------- | ---------------------------- |
| Returns one element             | Returns an array             |
| Stops at the first match        | Checks all existing elements |
| Returns `undefined` if no match | Returns `[]` if no match     |

### Time complexity

- Best case: \\(O(1)\\), if the first element matches.
- Worst case: \\(O(n)\\), if the match is last or no match exists.
- Extra space: \\(O(1)\\).

Interview takeaway: Use `find()` when you need one matching element, not all matching elements.

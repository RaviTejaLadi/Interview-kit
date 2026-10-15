# `forEach()`

### What does `forEach()` do?

`forEach()` executes a callback for every existing array element. It is useful for side effects, such as logging, updating an external variable, or calling another function.

Unlike `map()`, `forEach()` does not create and return a transformed array. Its return value is always `undefined`.

### Polyfill implementation

// Implement forEach() using a basic for loop.

```
Array.prototype.myForEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("myForEach called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array) {
      callback.call(thisArg, array[i], i, array);
    }
  }
};
```

### Example

// Print every name with its index.

```
const names = ["Ravi", "Teja", "Kiran"];

const result = names.myForEach((name, index) => {
  console.log(`${index}: ${name}`);
});

console.log(result); // undefined
```

Output:

```
0: Ravi
1: Teja
2: Kiran
undefined
```

### Explanation

1. Loop through each existing element.
2. Execute the callback.
3. Do not collect the callback's return value.
4. Finish without returning anything, which means JavaScript returns `undefined`.

### Can you stop `forEach()` using `break`?

No. You cannot use `break` to exit the `forEach()` callback's iteration. Use a regular `for` loop when you need to stop early.

### Time complexity

- Time: \\(O(n)\\)
- Extra space: \\(O(1)\\), excluding callback allocations.

Interview takeaway: Use `forEach()` to perform an action for each element, not to build a result array.

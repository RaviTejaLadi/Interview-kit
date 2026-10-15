# `reduce()`

### What does `reduce()` do?

`reduce()` processes array elements one by one and combines them into a single accumulated result. That result can be a number, string, object, array, or another value.

For example, to calculate the sum of an array, the accumulator stores the running total.

REDUCE: SUM OF AN ARRAY

## 1

Total: 1

## 2

Total: 3

## 3

Total: 6

## 4

Total: 10

The accumulator carries the previous result into the next callback.

### Polyfill implementation

// Implement reduce() with and without an initial value.

```
Array.prototype.myReduce = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError("myReduce called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;

  let accumulator;
  let index = 0;

  // Check whether an initial value was supplied.
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // Find the first existing array element.
    while (index < length && !(index in array)) {
      index++;
    }

    if (index >= length) {
      throw new TypeError(
        "Reduce of empty array with no initial value"
      );
    }

    accumulator = array[index];
    index++;
  }

  for (; index < length; index++) {
    if (index in array) {
      accumulator = callback(
        accumulator,
        array[index],
        index,
        array
      );
    }
  }

  return accumulator;
};
```

### Example 1: With an initial value

// Calculate the sum starting from zero.

```
const numbers = [10, 20, 30, 40];

const result = numbers.myReduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(result); // 100
```

The accumulator changes at each iteration:

| Current value | Accumulator before | Accumulator after |
| ------------- | ------------------ | ----------------- |
| 10            | 0                  | 10                |
| 20            | 10                 | 30                |
| 30            | 30                 | 60                |
| 40            | 60                 | 100               |

### Example 2: Without an initial value

// Sum numbers without explicitly supplying an initial value.

```
const numbers = [10, 20, 30];

const result = numbers.myReduce((acc, current) => {
  return acc + current;
});

console.log(result); // 60
```

Here, the first existing array element (`10`) becomes the initial accumulator. Iteration begins with the next existing element.

### Why do we use `arguments.length`?

This is a crucial interview detail.

```
// Compare an omitted initial value with an explicit undefined.
console.log([1, 2].myReduce((acc, n) => acc + n));
// 3

console.log([1, 2].myReduce((acc, n) => n, undefined));
// 2
```

In the second call, `undefined` was explicitly supplied as the initial value. Therefore, it becomes the initial accumulator, and the callback runs for both elements.

Checking `initialValue === undefined` would not correctly distinguish these cases. `arguments.length` does.

### Time complexity

- Time: (O(n))
- Extra space: (O(1)), excluding allocations made inside the callback.

Interview takeaway: Use `reduce()` when you want to accumulate values. The initial-value check is one of its most important edge cases.

# `filter()`

### What does `filter()` do?

`filter()` checks each array element against a condition and returns a new array containing only the elements that pass the condition.

For example, if you want only even numbers, `filter()` checks every number and keeps the even ones.

### Polyfill implementation

// Implement filter() using a basic for loop.

```
Array.prototype.myFilter = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("myFilter called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;
  const result = [];

  for (let i = 0; i < length; i++) {
    if (i in array) {
      const value = array[i];

      if (callback.call(thisArg, value, i, array)) {
        result[result.length] = value;
      }
    }
  }

  return result;
};
```

### Example

// Keep only even numbers.

```
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.myFilter((num) => num % 2 === 0);

console.log(result);  // [2, 4, 6]
console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

### Explanation

- Create an empty result array.
- Loop through the input array.
- Call the callback for each existing element.
- If the callback returns a truthy value, add the original element to the result.
- Return the result array.

Notice that we store `value`, not the callback's return value. That's the key difference between `map()` and `filter()`.

Compare them:

```
// Compare map() transformation with filter() selection.
const numbers = [1, 2, 3, 4];

console.log(numbers.myMap((n) => n * 2));
// [2, 4, 6, 8]

console.log(numbers.myFilter((n) => n > 2));
// [3, 4]
```

### Time complexity

- Time: \\(O(n)\\)
- Extra space: \\(O(k)\\), where \\(k\\) is the number of matching elements.

Interview takeaway: Use `filter()` to select elements. It does not transform the selected elements.

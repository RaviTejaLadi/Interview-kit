# `map()`

### What does `map()` do?

`map()` transforms each element of an array and returns a new array containing the transformed values.

- It calls the callback for each existing array element.
- It keeps the output length aligned with the input array length.
- It does not modify the original array when used normally.
- It returns a new array.

HOW MAP WORKS

## 1

Input

## 2

Callback

## 4

Output

Each input value is transformed independently.

### Polyfill implementation

// Implement map() using a basic for loop.

```
Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("myMap called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const array = Object(this);
  const length = array.length >>> 0;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    // Skip indexes that do not exist in sparse arrays.
    if (i in array) {
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
};
```

### Example

// Transform each number into its square.

```
const numbers = [1, 2, 3, 4];

const result = numbers.myMap((num) => num * num);

console.log(result);  // [1, 4, 9, 16]
console.log(numbers); // [1, 2, 3, 4]
```

### Explanation

1. Validate that the callback is a function.
2. Create a new array with the same length as the input.
3. Loop through the input array.
4. Call the callback with the current value, index, and original array.
5. Store the returned value at the same index in the result.
6. Return the new array.

The callback receives three arguments:

````
// Display the arguments received by map().
```javascript
[10, 20, 30].myMap((value, index, array) => {
  console.log(value, index, array);
  return value * 2;
});
````

### Time complexity

- Time: \\(O(n)\\)
- Extra space: \\(O(n)\\)

Interview takeaway: Use `map()` when you want to transform every element and collect the results.

Suppose JavaScript provides this method:

```
// Transform every number into its square.
const numbers = [1, 2, 3, 4];
const result = numbers.map((num) => num * num);

console.log(result); // [1, 4, 9, 16]
```

A polyfill recreates that behavior using basic JavaScript features such as loops, callbacks, and arrays.

For practice, we'll add custom methods to `Array.prototype` with names like `myMap` and `myFilter`. Using custom names avoids overwriting the native methods.

Important: These are educational implementations that reproduce the main behavior. Exact native compatibility requires handling additional details, such as sparse arrays, callback validation, array species, and generic array-like objects.

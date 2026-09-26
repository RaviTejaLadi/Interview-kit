# What are higher-order functions?

A **higher-order function (HOF)** is a function that does at least one of these:

1. Accepts another function as an argument.
2. Returns a function.

Example 1 — accepts a function:

```javascript
// A higher-order function accepts another function as an argument.
function calculate(a, b, operation) {
  return operation(a, b);
}

const result = calculate(10, 20, (x, y) => x + y);

console.log(result); // 30
```

Example 2 — returns a function:

```javascript
// A higher-order function returns another function.
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);

console.log(double(5)); // 10
```

Common JavaScript HOFs include:

```text
map()
filter()
reduce()
forEach()
find()
some()
every()
```

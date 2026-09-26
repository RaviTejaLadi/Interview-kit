# What are arrow functions?

**Arrow functions** are a shorter syntax for writing functions, introduced in ES6.

```javascript
// An arrow function provides concise function syntax.
const add = (a, b) => {
  return a + b;
};

console.log(add(10, 20)); // 30
```

For a single expression, you can use an implicit return:

```javascript
// Arrow functions can implicitly return a single expression.
const add = (a, b) => a + b;

console.log(add(10, 20)); // 30
```

For one parameter, parentheses can be omitted:

```javascript
// Parentheses are optional for a single parameter.
const square = (number) => number * number;

console.log(square(5)); // 25
```

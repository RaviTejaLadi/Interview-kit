# Function declaration vs function expression.

Functions are one of the most important parts of JavaScript. They can be stored in variables, passed as arguments, returned from other functions, and combined to build reusable logic.

A **function declaration** defines a function using the `function` keyword with a function name.

```javascript
// A function declaration defines a named function.
function greet(name) {
  return `Hello, ${name}`;
}

console.log(greet('Ravi')); // Hello, Ravi
```

Function declarations are **fully hoisted**, so they can be called before their declaration.

```javascript
// Function declarations can be called before they appear in the code.
greet('Ravi');

function greet(name) {
  console.log(`Hello, ${name}`);
}
```

### Function Expression

A **function expression** creates a function and assigns it to a variable.

```javascript
// A function expression stores a function inside a variable.
const greet = function (name) {
  return `Hello, ${name}`;
};

console.log(greet('Ravi'));
```

Function expressions are **not callable before their initialization**.

```javascript
// Accessing a const function expression before initialization causes a ReferenceError.
// greet(); // ReferenceError

const greet = function () {
  console.log('Hello');
};
```

### Difference

| Function Declaration             | Function Expression                           |
| -------------------------------- | --------------------------------------------- |
| `function greet() {}`            | `const greet = function() {}`                 |
| Named declaration                | Function assigned to a variable               |
| Fully hoisted                    | Follows variable hoisting rules               |
| Can be called before declaration | Cannot safely be called before initialization |

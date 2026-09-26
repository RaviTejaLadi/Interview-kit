# What are first-class functions?

JavaScript treats functions as **first-class values**.

This means functions can be:

- Stored in variables
- Passed as arguments
- Returned from functions
- Stored in objects or arrays

### Store in a variable

```javascript
// Functions can be stored in variables.
const greet = function () {
  console.log('Hello');
};
```

### Pass as an argument

```javascript
// Functions can be passed as arguments.
function execute(callback) {
  callback();
}

execute(greet);
```

### Return from another function

```javascript
// Functions can be returned from other functions.
function createGreeting() {
  return function () {
    console.log('Hello');
  };
}

const greet = createGreeting();

greet();
```

### Important distinction

> **First-class function** is a language capability.

> **Higher-order function** is a function that takes or returns functions.

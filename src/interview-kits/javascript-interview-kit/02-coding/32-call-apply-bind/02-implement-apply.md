# Implement `apply()`.

The `apply()` method is similar to `call()`, but it accepts arguments as an array or array-like object rather than individually.

### Example using the built-in `apply()`

```
// Apply arguments from an array.
function add(a, b, c) {
  return `${this.name}: ${a + b + c}`;
}

const person = { name: "Ravi" };

console.log(add.apply(person, [10, 20, 30]));

// Output:
// Ravi: 60
```

### Polyfill implementation (without built-in `apply()`)

```
// Implement a custom version of Function.prototype.apply.
Function.prototype.myApply = function (context, args = []) {
  context = context == null ? globalThis : Object(context);

  const uniqueKey = Symbol("fn");

  context[uniqueKey] = this;

  const result = context[uniqueKey](...args);

  delete context[uniqueKey];

  return result;
};

function add(a, b, c) {
  return `${this.name}: ${a + b + c}`;
}

const person = { name: "Ravi" };

console.log(add.myApply(person, [10, 20, 30]));

// Output:
// Ravi: 60
```

### How it works

1. `this` refers to the function being invoked.
2. `context` specifies the value of `this`.
3. `args` contains the arguments to pass to the function.
4. We temporarily attach the function to `context`.
5. The spread operator `...args` passes the array elements as individual arguments.
6. We remove the temporary property and return the result.

Key difference: `call()` receives individual arguments, while `apply()` receives an array or array-like collection.

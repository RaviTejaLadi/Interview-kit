# Implement `bind()`.

The `bind()` method does not execute the function immediately. Instead, it returns a new function with a fixed `this` value and optionally some predefined arguments.

### Example using the built-in `bind()`

```
// Bind a function to a specific object.
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Ravi" };

const boundGreet = greet.bind(person, "Hello");

console.log(boundGreet("!"));

// Output:
// Hello, Ravi!
```

Here, `"Hello"` is supplied when binding the function. The exclamation mark is supplied later.

### Polyfill implementation (without built-in `bind()`)

```
// Implement a custom version of Function.prototype.bind.
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFunction = this;

  return function (...laterArgs) {
    return originalFunction.apply(
      context,
      [...boundArgs, ...laterArgs]
    );
  };
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Ravi" };

const boundGreet = greet.myBind(person, "Hello");

console.log(boundGreet("!"));

// Output:
// Hello, Ravi!
```

### How it works

1. `this` refers to the original function.
2. `context` stores the object to use as `this`.
3. `boundArgs` stores arguments supplied during binding.
4. `myBind()` returns a new function without executing the original function.
5. When the returned function is called, `laterArgs` captures its new arguments.
6. Both argument lists are combined, and the original function executes with the specified context.

Important: This simplified implementation uses `apply()` internally. It demonstrates the core idea, but it is not a complete native `bind()` polyfill. A production-quality implementation must also handle constructor calls, function properties, and other edge cases.

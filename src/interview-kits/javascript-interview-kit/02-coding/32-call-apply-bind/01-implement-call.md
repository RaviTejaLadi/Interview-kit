# Implement `call()`.

The `call()` method invokes a function immediately and allows you to specify what `this` should refer to. Arguments are passed individually.

### Example using the built-in `call()`

```
// Call a function with a specific this value.
function introduce(city, country) {
  console.log(
    `Hi, I'm ${this.name} from ${city}, ${country}.`
  );
}

const person = { name: "Ravi" };

introduce.call(person, "Hyderabad", "India");

// Output:
// Hi, I'm Ravi from Hyderabad, India.
```

### Polyfill implementation (without built-in `call()`)

The idea is to temporarily attach the function to the object, invoke it as a method, and then remove it.

```
// Implement a custom version of Function.prototype.call.
Function.prototype.myCall = function (context, ...args) {
  context = context == null ? globalThis : Object(context);

  const uniqueKey = Symbol("fn");

  context[uniqueKey] = this;

  const result = context[uniqueKey](...args);

  delete context[uniqueKey];

  return result;
};

function introduce(city, country) {
  return `Hi, I'm ${this.name} from ${city}, ${country}.`;
}

const person = { name: "Ravi" };

console.log(
  introduce.myCall(person, "Hyderabad", "India")
);

// Output:
// Hi, I'm Ravi from Hyderabad, India.
```

### How it works

1. `this` inside `myCall` refers to the function being called.
2. `context` is the object that should become `this`.
3. `Symbol()` creates a unique property key to avoid property-name collisions.
4. We temporarily assign the function to the object.
5. Calling `context[uniqueKey](...args)` makes `this` refer to `context`.
6. We delete the temporary property and return the result.

Important: This is an educational implementation. It does not perfectly reproduce native `call()` behavior, especially for primitive or `null` contexts in strict mode and when the called function throws an error.

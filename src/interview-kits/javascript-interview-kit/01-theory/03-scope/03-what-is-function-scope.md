# What is function scope?

**Function scope** means a variable is accessible throughout the function in which it is declared.

`var` is **function-scoped**.

```javascript
// var is scoped to the entire function.
function calculate() {
  var total = 100;

  if (true) {
    var discount = 20;
  }

  console.log(total); // 100
  console.log(discount); // 20
}

calculate();

// console.log(total); // ❌ ReferenceError
```

Notice that `discount` is accessible outside the `if` block because `var` does not have block scope.

### `let` and `const` are different

```javascript
// let and const are block-scoped.
function example() {
  if (true) {
    let a = 10;
    const b = 20;

    console.log(a, b); // ✅
  }

  // console.log(a); // ❌ ReferenceError
  // console.log(b); // ❌ ReferenceError
}

example();
```

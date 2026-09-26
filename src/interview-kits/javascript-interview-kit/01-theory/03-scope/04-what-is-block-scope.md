# What is block scope?

**Block scope** means a variable is accessible only inside the `{}` block where it is declared.

`let` and `const` are block-scoped.

A block can be created by:

- `if`
- `for`
- `while`
- `switch`
- standalone `{}`

```javascript
// let and const are limited to the if block.
if (true) {
  let message = 'Hello';
  const count = 10;

  console.log(message); // Hello
  console.log(count); // 10
}

// console.log(message); // ❌ ReferenceError
// console.log(count);   // ❌ ReferenceError
```

### `var` vs `let`

```javascript
// Comparing var's function scope with let's block scope.
if (true) {
  var x = 10;
  let y = 20;
}

console.log(x); // 10
// console.log(y); // ❌ ReferenceError
```

**Interview point:** Prefer `let` and `const` because block scope reduces accidental variable access and naming conflicts.

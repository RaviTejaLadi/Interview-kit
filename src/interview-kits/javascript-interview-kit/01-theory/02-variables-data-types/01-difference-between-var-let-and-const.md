# Difference between `var`, `let`, and `const`.

`var`, `let`, and `const` are used to declare variables, but they differ in **scope, hoisting, and reassignment**.

| Feature                 | `var`    | `let`  | `const` |
| ----------------------- | -------- | ------ | ------- |
| Scope                   | Function | Block  | Block   |
| Reassign                | ✅ Yes   | ✅ Yes | ❌ No   |
| Redeclare in same scope | ✅ Yes   | ❌ No  | ❌ No   |
| Hoisted                 | ✅ Yes   | ✅ Yes | ✅ Yes  |
| TDZ                     | ❌ No    | ✅ Yes | ✅ Yes  |

```javascript
// Comparing var, let, and const.
function example() {
  var a = 10;
  let b = 20;
  const c = 30;

  a = 100; // ✅
  b = 200; // ✅
  // c = 300; // ❌ TypeError

  console.log(a, b, c);
}

example();
```

### Block scope

`let` and `const` are block-scoped, while `var` is function-scoped.

```javascript
// Demonstrating block scope.
if (true) {
  var a = 10;
  let b = 20;
  const c = 30;
}

console.log(a); // 10
// console.log(b); // ReferenceError
// console.log(c); // ReferenceError
```

**Interview point:** In modern JavaScript, prefer `const` by default and use `let` when reassignment is required. Avoid `var` in new code.

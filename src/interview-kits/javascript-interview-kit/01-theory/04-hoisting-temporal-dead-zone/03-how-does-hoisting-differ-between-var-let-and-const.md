# How does hoisting differ between `var`, `let`, and `const`?

## `var`

`var` is hoisted and automatically initialized with `undefined`.

```javascript
// var is hoisted and initialized to undefined.
console.log(value); // undefined

var value = 100;

console.log(value); // 100
```

Conceptually:

```javascript
// Conceptual representation of var behavior.
var value = undefined;

console.log(value);

value = 100;
```

---

## `let`

`let` is hoisted, but it is **not initialized** until execution reaches its declaration.

```javascript
// let is hoisted but remains uninitialized in the TDZ.
console.log(value); // ReferenceError

let value = 100;
```

JavaScript knows that `value` exists in the scope, but you cannot access it yet.

---

## `const`

`const` behaves similarly to `let`.

```javascript
// const is hoisted but cannot be accessed before initialization.
console.log(value); // ReferenceError

const value = 100;
```

Additionally, `const` must be initialized when declared:

```javascript
// const requires an initializer.
const value = 100; // ✅

// const anotherValue; // ❌ SyntaxError
```

### Simple comparison

```text
var
 ↓
Hoisted
 ↓
Initialized as undefined
 ↓
Can be accessed before declaration

let / const
 ↓
Hoisted
 ↓
Uninitialized
 ↓
TDZ
 ↓
Cannot be accessed before declaration
```

# Function declaration vs function expression hoisting.

This is an important interview question.

## Function Declaration

A function declaration is fully hoisted.

```javascript
// Function declarations can be called before their declaration.
greet();

function greet() {
  console.log('Hello');
}
```

✅ Works.

---

## Function Expression with `var`

A function expression assigned to `var` follows `var` hoisting rules.

```javascript
// The variable is hoisted as undefined, but the function assignment happens later.
greet();

var greet = function () {
  console.log('Hello');
};
```

This results in:

```text
TypeError: greet is not a function
```

Conceptually:

```javascript
// Conceptual representation of var function-expression behavior.
var greet = undefined;

greet(); // TypeError

greet = function () {
  console.log('Hello');
};
```

The variable exists, but it contains `undefined` at the time of the call.

---

## Function Expression with `let`

A function expression assigned to `let` is also not callable before initialization.

```javascript
// let keeps the variable in the TDZ until initialization.
greet(); // ReferenceError

let greet = function () {
  console.log('Hello');
};
```

The difference is:

- `var` → `undefined` → calling it causes `TypeError`
- `let` → TDZ → accessing it causes `ReferenceError`

---

## Quick comparison

| Code                        | Before declaration  |
| --------------------------- | ------------------- |
| Function declaration        | ✅ Works            |
| `var fn = function () {}`   | ❌ `TypeError`      |
| `let fn = function () {}`   | ❌ `ReferenceError` |
| `const fn = function () {}` | ❌ `ReferenceError` |

# What happens when you access a variable before initialization?

It depends on how the variable was declared.

## `var`

You get `undefined`.

```javascript
// var is initialized to undefined during hoisting.
console.log(value); // undefined

var value = 10;
```

---

## `let`

You get a `ReferenceError` because the variable is in the TDZ.

```javascript
// let cannot be accessed before its declaration.
console.log(value); // ReferenceError

let value = 10;
```

---

## `const`

Same behavior as `let`.

```javascript
// const cannot be accessed before initialization.
console.log(value); // ReferenceError

const value = 10;
```

---

## Function declaration

You can call it before the declaration.

```javascript
// Function declarations are fully hoisted.
sayHello();

function sayHello() {
  console.log('Hello');
}
```

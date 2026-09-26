# What are truthy and falsy values?

JavaScript converts values to `true` or `false` when they are used in a **boolean context**, such as an `if` condition.

### Falsy values

The main falsy values are:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is generally **truthy**.

```javascript
// Demonstrating truthy and falsy values.
if ('hello') {
  console.log('This runs'); // truthy
}

if (0) {
  console.log('This does not run'); // falsy
}
```

### Common examples

```javascript
// Checking common truthy and falsy values.
console.log(Boolean('hello')); // true
console.log(Boolean('')); // false

console.log(Boolean(100)); // true
console.log(Boolean(0)); // false

console.log(Boolean([])); // true
console.log(Boolean({})); // true

console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
```

### Important gotcha: empty arrays and objects are truthy

This often causes confusion:

```javascript
// Arrays and objects are truthy even when empty.
if ([]) {
  console.log('Array is truthy');
}

if ({}) {
  console.log('Object is truthy');
}
```

Both conditions execute.

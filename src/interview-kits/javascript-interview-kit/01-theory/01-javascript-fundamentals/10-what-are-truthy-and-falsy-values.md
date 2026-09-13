# What are truthy and falsy values?

**Definition:**
A **truthy value** is a value that JavaScript treats as `true` when used in a Boolean context.

A **falsy value** is a value that JavaScript treats as `false`.

### Falsy values

The main falsy values in JavaScript are:

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

Everything else is generally **truthy**, including:

```javascript
// Objects and arrays are truthy even when empty
console.log(Boolean([])); // true
console.log(Boolean({})); // true
console.log(Boolean('hello')); // true
console.log(Boolean(100)); // true
```

### Practical example

```javascript
// Check whether a value is truthy
const username = '';

if (username) {
  console.log('Username exists');
} else {
  console.log('Username is empty');
}
```

Output:

```text
Username is empty
```

Because an empty string `""` is falsy.

### Common React/JavaScript pattern

```javascript
// Render the message only when isLoggedIn is truthy
{
  isLoggedIn && <p>Welcome back!</p>;
}
```

If `isLoggedIn` is `true`, the `<p>` is rendered. If it is `false`, it isn't.

### ⚠️ Important gotcha

Empty arrays and objects are **truthy**:

```javascript
// Empty arrays and objects are truthy
if ([]) {
  console.log('Runs');
}

if ({}) {
  console.log('Also runs');
}
```

Both conditions run.

---

## Quick Interview Cheat Sheet

| Question                      | Short Answer                                                     |
| ----------------------------- | ---------------------------------------------------------------- |
| **JavaScript**                | A high-level, dynamically typed programming language             |
| **ECMAScript**                | The standardized specification implemented by JavaScript engines |
| **Single-threaded?**          | Main JavaScript execution is single-threaded                     |
| **Synchronous/Asynchronous?** | Synchronous by default, with asynchronous runtime capabilities   |
| **JavaScript engine**         | Executes and optimizes JavaScript code                           |
| **V8**                        | Google's JavaScript engine used by Chrome and Node.js            |
| **`"use strict"`**            | Enables stricter JavaScript rules                                |
| **`==`**                      | Loose equality with type coercion                                |
| **`===`**                     | Strict equality without implicit type conversion                 |
| **Type coercion**             | Conversion of values between types                               |
| **Truthy**                    | Treated as `true` in Boolean contexts                            |
| **Falsy**                     | Treated as `false` in Boolean contexts                           |

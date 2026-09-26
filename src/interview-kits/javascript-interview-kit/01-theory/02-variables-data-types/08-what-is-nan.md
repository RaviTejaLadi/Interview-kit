# What is `NaN`?

`NaN` means **Not-a-Number**.

It represents an invalid or failed numeric operation.

```javascript
// An invalid numeric conversion produces NaN.
const result = Number('hello');

console.log(result); // NaN
```

Another example:

```javascript
// Dividing zero by zero results in NaN.
console.log(0 / 0); // NaN
```

### Important: `NaN` is still a number type

```javascript
// NaN belongs to JavaScript's number type.
console.log(typeof NaN); // "number"
```

### Checking for `NaN`

Prefer `Number.isNaN()`.

```javascript
// Checking whether a value is specifically NaN.
const value = Number('hello');

console.log(Number.isNaN(value)); // true
```

Avoid relying on:

```javascript
// Global isNaN performs coercion before checking.
console.log(isNaN('hello')); // true
```

`Number.isNaN()` is usually safer because it doesn't perform implicit type conversion.

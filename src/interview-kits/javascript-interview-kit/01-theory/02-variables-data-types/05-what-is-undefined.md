# What is `undefined`?

`undefined` means **a value has not been assigned or is unavailable**.

Common cases:

### Declared but not initialized

```javascript
// A declared variable without a value is undefined.
let value;

console.log(value); // undefined
```

### Missing object property

```javascript
// Accessing a property that doesn't exist returns undefined.
const user = {
  name: 'Ravi',
};

console.log(user.age); // undefined
```

### Function with no return value

```javascript
// A function without an explicit return returns undefined.
function greet() {
  console.log('Hello');
}

const result = greet();

console.log(result); // undefined
```

`undefined` generally represents **"not assigned / not available."**

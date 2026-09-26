# What are reference types?

**Reference types** are objects whose variables hold a reference to an object rather than the object's primitive value itself.

Common reference types include:

- Objects
- Arrays
- Functions
- Dates
- Maps
- Sets
- Regular expressions

```javascript
// Creating common reference types.
const user = {
  name: 'Ravi',
  age: 25,
};

const numbers = [10, 20, 30];

const greet = function () {
  console.log('Hello');
};
```

Technically, JavaScript's `typeof` operator reports these as `"object"` or `"function"`:

```javascript
// Checking the types of reference values.
console.log(typeof user); // "object"
console.log(typeof numbers); // "object"
console.log(typeof greet); // "function"
```

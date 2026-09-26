# Difference between primitive and reference values.

The main difference is **how assignment and copying behave**.

### Primitive values

A primitive value is copied by value.

```javascript
// Primitive values are copied independently.
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Changing `b` does not affect `a`.

### Reference values

Objects are assigned through references to the same object.

```javascript
// Object variables can refer to the same object.
const user1 = {
  name: 'Ravi',
};

const user2 = user1;

user2.name = 'Rahul';

console.log(user1.name); // "Rahul"
console.log(user2.name); // "Rahul"
```

Both variables refer to the same object.

### Simple analogy

Think of a primitive as **a photocopy of a value**.

Think of an object reference as **an address pointing to a house**.

Copying the address doesn't create another house.

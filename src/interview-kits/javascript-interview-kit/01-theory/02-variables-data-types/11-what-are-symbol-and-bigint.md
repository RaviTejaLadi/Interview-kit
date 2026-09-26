# What are `Symbol` and `BigInt`?

### `Symbol`

`Symbol` creates a **unique primitive value**.

It is commonly used as a unique object property key.

```javascript
// Creating a unique Symbol value.
const id = Symbol('id');

const user = {
  name: 'Ravi',
  [id]: 123,
};

console.log(user[id]); // 123
```

Even two Symbols with the same description are different:

```javascript
// Symbols with the same description are still unique.
const a = Symbol('id');
const b = Symbol('id');

console.log(a === b); // false
```

### `BigInt`

`BigInt` is used for **integers larger than JavaScript's safe `Number` integer range**.

```javascript
// BigInt supports integers beyond Number.MAX_SAFE_INTEGER.
const largeNumber = 9007199254740993n;

console.log(largeNumber);
```

You can also use `BigInt()`:

```javascript
// Creating a BigInt from an integer string.
const value = BigInt('9007199254740993');

console.log(value); // 9007199254740993n
```

### Important gotcha

You cannot directly mix `BigInt` and `Number` in arithmetic.

```javascript
// BigInt and Number cannot be mixed directly.
const a = 10n;
const b = 5;

// console.log(a + b); // TypeError
console.log(a + 5n); // 15n
```

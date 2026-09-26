# What are primitive data types in JavaScript?

**Primitive values** are immutable values that represent a single piece of data.

JavaScript has **7 primitive data types**:

1. `string`
2. `number`
3. `bigint`
4. `boolean`
5. `undefined`
6. `symbol`
7. `null`

```javascript
// Examples of JavaScript primitive values.
const name = 'Ravi'; // string
const age = 25; // number
const isDeveloper = true; // boolean
const score = undefined; // undefined
const user = null; // null
const id = Symbol('id'); // symbol
const bigNumber = 123n; // bigint
```

### Important property: primitives are immutable

You cannot modify a primitive value itself.

```javascript
// Strings are primitive and immutable.
let name = 'Ravi';

name[0] = 'K';

console.log(name); // "Ravi"
```

Instead, a new string value is created when you perform an operation.

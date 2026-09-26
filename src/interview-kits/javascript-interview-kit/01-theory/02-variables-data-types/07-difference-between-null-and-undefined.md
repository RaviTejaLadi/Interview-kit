# Difference between `null` and `undefined`.

Both represent absence of a value, but their meaning is different.

| `undefined`                         | `null`                                  |
| ----------------------------------- | --------------------------------------- |
| Usually means value wasn't assigned | Explicitly represents no value          |
| Often produced automatically        | Usually assigned intentionally          |
| Type is `"undefined"`               | `typeof` incorrectly reports `"object"` |

```javascript
// Comparing undefined and null.
let a;
let b = null;

console.log(a); // undefined
console.log(b); // null

console.log(typeof a); // "undefined"
console.log(typeof b); // "object"
```

### Equality difference

```javascript
// Demonstrating loose and strict equality.
console.log(null == undefined); // true
console.log(null === undefined); // false
```

`==` performs type coercion, while `===` checks both type and value.

**Interview tip:** Prefer `===` unless you intentionally need loose equality.

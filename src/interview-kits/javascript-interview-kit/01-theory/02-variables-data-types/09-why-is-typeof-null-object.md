# Why is `typeof null` `"object"`?

This is a **historical JavaScript bug** that has been preserved for backward compatibility.

```javascript
// Demonstrating the historical typeof null behavior.
console.log(typeof null); // "object"
```

`null` is actually a **primitive value**, not an object.

The behavior comes from JavaScript's early implementation and cannot simply be changed now because existing code depends on it.

### Correct way to check for `null`

```javascript
// Correctly checking for null.
const value = null;

console.log(value === null); // true
```

**Interview answer:**
`typeof null === "object"` is a historical bug in JavaScript that was retained for backward compatibility.

# Compare two objects.

Check whether two objects have the same properties and values. In this example, we compare nested objects too.

Input:

```
const obj1 = { name: "Ravi", address: { city: "Hyderabad" } };
const obj2 = { name: "Ravi", address: { city: "Hyderabad" } };
```

Expected output: `true`

### Without built-in methods

// Compare objects recursively, including nested objects and arrays.

```
function areEqual(a, b) {
  if (a === b) return true;

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  let countA = 0;
  let countB = 0;

  for (const key in a) {
    if (Object.prototype.hasOwnProperty.call(a, key)) {
      countA++;

      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }

      if (!areEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  for (const key in b) {
    if (Object.prototype.hasOwnProperty.call(b, key)) {
      countB++;
    }
  }

  return countA === countB;
}

const obj1 = { name: "Ravi", address: { city: "Hyderabad" } };
const obj2 = { name: "Ravi", address: { city: "Hyderabad" } };

console.log(areEqual(obj1, obj2)); // true
```

Explanation:

1. If both values are identical, return `true`.
2. If either value is a primitive or `null`, compare them directly.
3. Check that both values are either arrays or non-array objects.
4. Compare each property recursively.
5. Check that both objects contain the same number of own enumerable properties.

This implementation is intended for ordinary data objects and arrays. It does not handle circular references, symbols, or special objects such as `Date` and `Map` correctly.

### With built-in methods

// Compare JSON-compatible data by serializing both objects.

```
function areEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

console.log(
  areEqual(
    { name: "Ravi", age: 25 },
    { name: "Ravi", age: 25 }
  )
); // true
```

Explanation:

- `JSON.stringify()` converts each object into a JSON string.
- Equal strings produce `true`.

Gotcha: This is not a reliable general-purpose deep comparison. Property order can affect the result, and JSON serialization ignores or transforms certain values, including `undefined`, functions, and special object types.

For general deep equality, use a well-tested deep-equality utility rather than relying on JSON serialization.

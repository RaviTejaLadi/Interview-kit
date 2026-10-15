# Deep clone an object.

A deep clone creates a new object and also copies its nested objects and arrays, so changes to nested data don't affect the original.

Input:

```
const user = {
  name: "Ravi",
  address: { city: "Hyderabad" }
};
```

### Without built-in methods

// Recursively copy nested objects and arrays.

```
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  const result = Array.isArray(value) ? [] : {};

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }

  return result;
}

const user = {
  name: "Ravi",
  address: { city: "Hyderabad" },
  skills: ["React", "JavaScript"]
};

const cloned = deepClone(user);

cloned.address.city = "Chennai";
cloned.skills[0] = "TypeScript";

console.log(user.address.city); // "Hyderabad"
console.log(user.skills[0]);    // "React"
```

Explanation:

1. If the value is a primitive or `null`, return it directly.
2. Check whether the value is an array or an object.
3. Create a new array or object.
4. Recursively clone each property.
5. Return the completed copy.

This is a basic recursive deep clone for plain objects and arrays. It does not correctly preserve special types such as `Date`, `Map`, `Set`, class instances, circular references, or property descriptors.

### With built-in methods

// Use structuredClone() to copy supported nested data structures.

```
const user = {
  name: "Ravi",
  address: { city: "Hyderabad" },
  skills: ["React", "JavaScript"]
};

const cloned = structuredClone(user);

cloned.address.city = "Chennai";

console.log(user.address.city);  // "Hyderabad"
console.log(cloned.address.city); // "Chennai"
```

Explanation:

`structuredClone()` recursively clones supported data types, including nested objects, arrays, `Date`, `Map`, and `Set`. It also supports circular references.

Important: It cannot clone every JavaScript value, such as functions. It may throw a `DataCloneError` for unsupported values.

For normal application data, prefer `structuredClone()` when its supported types meet your requirements.

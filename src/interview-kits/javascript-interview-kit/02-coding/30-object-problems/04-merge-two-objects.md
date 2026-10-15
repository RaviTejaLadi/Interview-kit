# Merge two objects.

Combine the properties of two objects into one. When both objects contain the same key, the second object's value wins.

Input:

```
const obj1 = { name: "Ravi", age: 25 };
const obj2 = { age: 26, city: "Hyderabad" };
```

Expected output:

```
{ name: "Ravi", age: 26, city: "Hyderabad" }
```

### Without built-in methods

// Copy properties from both objects using loops.

```
function mergeObjects(obj1, obj2) {
  const result = {};

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      result[key] = obj1[key];
    }
  }

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      result[key] = obj2[key];
    }
  }

  return result;
}

console.log(
  mergeObjects(
    { name: "Ravi", age: 25 },
    { age: 26, city: "Hyderabad" }
  )
);
// { name: "Ravi", age: 26, city: "Hyderabad" }
```

Explanation:

Copy the first object's properties, then copy the second object's properties. Assigning the same key again replaces its previous value.

### With built-in methods

// Merge objects using the spread operator.

```
const obj1 = { name: "Ravi", age: 25 };
const obj2 = { age: 26, city: "Hyderabad" };

const merged = { ...obj1, ...obj2 };

console.log(merged);
// { name: "Ravi", age: 26, city: "Hyderabad" }
```

Explanation:

The spread operator copies properties from left to right. Later values overwrite earlier ones.

Important: This is a shallow merge. If both objects have an `address` property, the second `address` replaces the first one entirely. It does not automatically merge nested objects.

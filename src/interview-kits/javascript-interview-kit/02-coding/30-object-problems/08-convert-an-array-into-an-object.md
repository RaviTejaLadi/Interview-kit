# Convert an array into an object.

Convert an array of objects into an object whose keys are the objects' IDs.

Input:

```
const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" }
];
```

Expected output:

```
{
  1: { id: 1, name: "Ravi" },
  2: { id: 2, name: "Priya" }
}
```

### Without built-in methods

// Create an object and assign each array item to its ID key.

```
function arrayToObject(arr) {
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    result[arr[i].id] = arr[i];
  }

  return result;
}

const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" }
];

console.log(arrayToObject(users));
// { 1: { id: 1, name: "Ravi" }, 2: { id: 2, name: "Priya" } }
```

Explanation:

1. Create an empty object.
2. Loop through the array.
3. Use each item's `id` as the object's key.
4. Store the entire item as the value.

### With built-in methods

// Convert the array into an object using Object.fromEntries().

```
function arrayToObject(arr) {
  return Object.fromEntries(
    arr.map((item) => [item.id, item])
  );
}

const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" }
];

console.log(arrayToObject(users));
// { 1: { id: 1, name: "Ravi" }, 2: { id: 2, name: "Priya" } }
```

Explanation:

- `map()` transforms each item into a `[key, value]` pair.
- `Object.fromEntries()` converts those pairs into an object.

Gotcha: If two items have the same ID, the later item overwrites the earlier one. Use a `Map` instead if keys need to retain non-string types such as objects.

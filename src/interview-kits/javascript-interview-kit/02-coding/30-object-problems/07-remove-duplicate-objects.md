# Remove duplicate objects.

Remove objects with duplicate IDs while preserving the first occurrence.

Input:

```
const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" },
  { id: 1, name: "Ravi" }
];
```

Expected output:

```
[
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" }
]
```

For this problem, we'll define duplicates by the `id` property. Two objects can have the same ID even if their other properties differ.

### Without built-in methods

// Keep the first object for each ID using nested loops.

```
function removeDuplicateObjects(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let duplicate = false;

    for (let j = 0; j < result.length; j++) {
      if (arr[i].id === result[j].id) {
        duplicate = true;
        break;
      }
    }

    if (!duplicate) {
      result[result.length] = arr[i];
    }
  }

  return result;
}

const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" },
  { id: 1, name: "Ravi" }
];

console.log(removeDuplicateObjects(users));
// [{ id: 1, name: "Ravi" }, { id: 2, name: "Priya" }]
```

Explanation:

1. Start with an empty result array.
2. Compare each object's ID with the IDs already in the result.
3. Add the object only if its ID hasn't appeared before.

### With built-in methods

// Use Set to track IDs already encountered.

```
function removeDuplicateObjects(arr) {
  const seen = new Set();

  return arr.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}

const users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Priya" },
  { id: 1, name: "Ravi" }
];

console.log(removeDuplicateObjects(users));
// [{ id: 1, name: "Ravi" }, { id: 2, name: "Priya" }]
```

Explanation:

- `Set` stores IDs already encountered.
- `filter()` retains only the first object with each ID.
- The original array is not modified.

Interview tip: This solution takes (O(n)) time on average, compared with (O(n^2)) for the nested-loop version.

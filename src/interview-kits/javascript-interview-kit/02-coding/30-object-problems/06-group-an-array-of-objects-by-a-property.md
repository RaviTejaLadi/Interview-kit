# Group an array of objects by a property.

Group objects that share the same property value.

Input:

```
const users = [
  { name: "Ravi", role: "developer" },
  { name: "Priya", role: "designer" },
  { name: "Arun", role: "developer" }
];
```

Expected output:

```
{
  developer: [
    { name: "Ravi", role: "developer" },
    { name: "Arun", role: "developer" }
  ],
  designer: [
    { name: "Priya", role: "designer" }
  ]
}
```

### Without built-in methods

// Group objects by a property using a loop.

```
function groupByProperty(arr, property) {
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    const key = arr[i][property];

    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = [];
    }

    result[key][result[key].length] = arr[i];
  }

  return result;
}

const users = [
  { name: "Ravi", role: "developer" },
  { name: "Priya", role: "designer" },
  { name: "Arun", role: "developer" }
];

console.log(groupByProperty(users, "role"));
```

Explanation:

1. Read the grouping property's value from each object.
2. Create an array for that value if one doesn't exist.
3. Add the current object to the corresponding array.
4. Return the grouped result.

### With built-in methods

// Group objects using reduce().

```
function groupByProperty(arr, property) {
  return arr.reduce((result, item) => {
    const key = item[property];

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);

    return result;
  }, {});
}

const users = [
  { name: "Ravi", role: "developer" },
  { name: "Priya", role: "designer" },
  { name: "Arun", role: "developer" }
];

console.log(groupByProperty(users, "role"));
```

Explanation:

- `reduce()` processes every item.
- `result` stores the groups.
- `push()` adds each item to its group.

Gotcha: If property values can be arbitrary strings such as `"constructor"` or `"__proto__"`, consider using `Object.create(null)` or a `Map` for safer grouping.

# Convert an object into an array.

Convert an object's properties into an array of key-value pairs.

Input:

```
const user = {
  name: "Ravi",
  age: 25,
  city: "Hyderabad"
};
```

Expected output:

```
[
  ["name", "Ravi"],
  ["age", 25],
  ["city", "Hyderabad"]
]
```

### Without built-in methods

// Convert an object's properties into key-value pairs using loops.

```
function objectToArray(obj) {
  const result = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[result.length] = [key, obj[key]];
    }
  }

  return result;
}

const user = {
  name: "Ravi",
  age: 25,
  city: "Hyderabad"
};

console.log(objectToArray(user));
// [["name", "Ravi"], ["age", 25], ["city", "Hyderabad"]]
```

Explanation:

1. Create an empty array.
2. Loop through the object's own enumerable properties.
3. Create a two-element array containing the key and its value.
4. Add that pair to the result.

### With built-in methods

// Convert an object into key-value pairs using Object.entries().

```
const user = {
  name: "Ravi",
  age: 25,
  city: "Hyderabad"
};

const result = Object.entries(user);

console.log(result);
// [["name", "Ravi"], ["age", 25], ["city", "Hyderabad"]]
```

Explanation:

`Object.entries()` returns an array containing a `[key, value]` pair for each own enumerable string-keyed property.

You can also convert an object into an array of only its values or keys:

// Extract an object's keys and values into separate arrays.

```
const user = {
  name: "Ravi",
  age: 25,
  city: "Hyderabad"
};

console.log(Object.keys(user));
// ["name", "age", "city"]

console.log(Object.values(user));
// ["Ravi", 25, "Hyderabad"]
```

Remember:

- `Object.keys()` returns property names.
- `Object.values()` returns property values.
- `Object.entries()` returns key-value pairs.

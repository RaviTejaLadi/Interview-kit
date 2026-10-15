# Flatten a nested object.

Convert a nested object into a flat object using dot-separated property names.

Input:

```
const user = {
  name: "Ravi",
  address: {
    city: "Hyderabad",
    pin: { code: 500001 }
  }
};
```

Expected output:

```
{
  name: "Ravi",
  "address.city": "Hyderabad",
  "address.pin.code": 500001
}
```

### Without built-in methods

// Flatten nested plain objects recursively using loops.

```
function flattenObject(obj, prefix = "", result = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

const user = {
  name: "Ravi",
  address: {
    city: "Hyderabad",
    pin: { code: 500001 }
  }
};

console.log(flattenObject(user));
// {
//   name: "Ravi",
//   "address.city": "Hyderabad",
//   "address.pin.code": 500001
// }
```

Explanation:

1. Loop through every property.
2. Build its full path using the current prefix.
3. If the value is a nested plain object, recursively process it.
4. Otherwise, store the value using the full path as the key.

This example keeps arrays as values rather than flattening their contents.

### With built-in methods

// Flatten nested objects using Object.entries() and reduce().

```
function flattenObject(obj, prefix = "") {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }

    return result;
  }, {});
}

console.log(
  flattenObject({
    name: "Ravi",
    address: { city: "Hyderabad" }
  })
);
// { name: "Ravi", "address.city": "Hyderabad" }
```

Explanation:

- `Object.entries()` converts properties into key-value pairs.
- `reduce()` builds the flattened result.
- `Object.assign()` adds recursively flattened properties to the result.

Gotcha: If an original key contains a dot, flattened paths can become ambiguous. A production implementation may need an escaping convention or a different path format.

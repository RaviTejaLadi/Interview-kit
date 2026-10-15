# Clone an object.

Create a new object with the same top-level properties as the original.

Input:

```
const user = { name: "Ravi", age: 25 };
```

Expected output:

```
{ name: "Ravi", age: 25 }
```

### Without built-in methods

// Clone an object's own enumerable properties using a loop.

```
function cloneObject(obj) {
  const result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

const user = { name: "Ravi", age: 25 };
const cloned = cloneObject(user);

console.log(cloned); // { name: "Ravi", age: 25 }
console.log(cloned === user); // false
```

Explanation:

1. Create an empty object.
2. Loop through the original object's own enumerable properties.
3. Copy each property and its value.
4. Return the new object.

The new object has a different reference, but nested objects are still shared.

### With built-in methods

// Clone an object using the spread operator.

```
const user = { name: "Ravi", age: 25 };

const cloned = { ...user };

console.log(cloned); // { name: "Ravi", age: 25 }
console.log(cloned === user); // false
```

Explanation:

The spread operator (`...`) copies the object's own enumerable properties into a new object.

Important: Both solutions create a shallow clone. For example, if `user` contains `address: { city: "Hyderabad" }`, both objects will reference the same nested `address` object.

## Interview Summary 🧠

**Immutability:** Don't modify existing data; create a new version.

**Mutation:** Changes the existing object or array.

**Non-mutation:** Creates a new object or array.

**Object update:**

```javascript
// Create a new object with the changed property.
const updated = {
  ...user,
  age: 26,
};
```

**Array add:**

```javascript
// Create a new array with an additional item.
const updated = [...users, newUser];
```

**Array remove:**

```javascript
// Create a new array without the matching item.
const updated = users.filter((user) => user.id !== id);
```

**Array update:**

```javascript
// Create a new array and replace only the matching item.
const updated = users.map((user) => (user.id === id ? { ...user, name: 'New Name' } : user));
```

**Nested object update:**

```javascript
// Create new references along the entire path being changed.
const updated = {
  ...user,
  address: {
    ...user.address,
    city: 'Hyderabad',
  },
};
```

### ⭐ Key interview point

> **Immutability does not mean JavaScript objects are inherently immutable. It means your code avoids modifying existing references and instead creates new references for changed data.**

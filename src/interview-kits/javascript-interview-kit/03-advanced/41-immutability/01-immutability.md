# Immutability

**Immutability** means treating existing data as read-only. Instead of changing an existing object or array, you create a new version with the required changes.

This is especially important in **React**, where immutable state updates make change detection predictable and help avoid accidental side effects.

---

## 1. What does immutability mean?

**Definition:**  
Immutability means that once a value is created, you do not modify that value directly. If you need a different value, you create a new one.

For objects and arrays, JavaScript does not automatically make them immutable. It is a programming practice.

```javascript
// Create a new object instead of modifying the existing object.
const user = {
  name: 'Ravi',
  age: 25,
};

const updatedUser = {
  ...user,
  age: 26,
};

console.log(user.age); // 25
console.log(updatedUser.age); // 26
```

The original `user` remains unchanged.

### Simple analogy

Think of an object as a **document**.

Mutation means:

> Open the original document → edit it → save it.

Immutability means:

> Open the original document → make a copy → edit the copy.

---

# 2. Mutation vs Non-Mutation

## Mutation

**Definition:**  
Mutation means directly changing an existing object or array.

```javascript
// This directly changes the existing object.
const user = {
  name: 'Ravi',
  age: 25,
};

user.age = 26;

console.log(user);
// { name: "Ravi", age: 26 }
```

The original object has been modified.

### Common mutating operations

For arrays:

```text
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

For objects:

```javascript
// Directly changing a property mutates the object.
user.name = 'Rahul';
```

---

## Non-Mutation

**Definition:**  
A non-mutating operation creates a new value instead of changing the original value.

```javascript
// Create a new array instead of modifying the original array.
const numbers = [1, 2, 3];

const updatedNumbers = [...numbers, 4];

console.log(numbers); // [1, 2, 3]
console.log(updatedNumbers); // [1, 2, 3, 4]
```

### Common non-mutating array operations

```text
map()
filter()
slice()
concat()
toSorted()
toReversed()
toSpliced()
```

And spread syntax:

```javascript
// Spread creates a new array.
const newArray = [...oldArray];
```

---

# 3. Why Do Immutable Updates Matter in Frontend Development?

Immutable updates are important because frontend applications frequently depend on **change detection**.

This is particularly relevant to React.

React commonly uses **reference equality** to determine whether values have changed.

```javascript
// Create a new object reference when updating state.
const updatedUser = {
  ...user,
  name: 'Ravi',
};
```

Now:

```javascript
// The two objects have different references.
console.log(user === updatedUser);
// false
```

If you mutate the original object:

```javascript
// Mutation keeps the same object reference.
user.name = 'Ravi';

console.log(user === user);
// true
```

The data changed, but the reference did not.

---

## Benefits of Immutability

### 1. Predictable state changes

You can clearly see where a new state was created.

### 2. Easier debugging

The previous object remains available.

```text
Old State
   ↓
{ count: 0 }

New State
   ↓
{ count: 1 }
```

You can compare both states.

### 3. Prevents accidental side effects

If multiple parts of an application reference the same object, mutation can unexpectedly affect all of them.

### 4. Works well with React

React state should generally be updated by creating a new object or array rather than modifying the existing state directly.

### 5. Enables optimization

Reference comparisons are cheap:

```javascript
// Reference comparison is much cheaper than deeply comparing large objects.
previousUser === nextUser;
```

Libraries and frameworks can use this pattern for efficient change detection.

---

# 4. How Do You Immutably Update Objects?

The most common technique is the **spread operator (`...`)**.

## Updating a property

```javascript
// Create a new object with an updated age.
const user = {
  name: 'Ravi',
  age: 25,
};

const updatedUser = {
  ...user,
  age: 26,
};

console.log(updatedUser);
// { name: "Ravi", age: 26 }

console.log(user);
// { name: "Ravi", age: 25 }
```

---

## Adding a property

```javascript
// Create a new object with an additional property.
const user = {
  name: 'Ravi',
};

const updatedUser = {
  ...user,
  age: 25,
};

console.log(updatedUser);
// { name: "Ravi", age: 25 }
```

---

## Removing a property

Use object destructuring.

```javascript
// Create a new object without the password property.
const user = {
  name: 'Ravi',
  age: 25,
  password: 'secret',
};

const { password, ...safeUser } = user;

console.log(safeUser);
// { name: "Ravi", age: 25 }
```

---

# 5. How Do You Immutably Update Nested Objects?

This is an important interview concept.

Suppose you have:

```javascript
// Define an object with nested state.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
    country: 'India',
  },
};
```

You should not do:

```javascript
// This mutates the nested address object.
user.address.city = 'Visakhapatnam';
```

Instead:

```javascript
// Create new references for each object along the update path.
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: 'Visakhapatnam',
  },
};
```

### Why spread both levels?

Because this:

```javascript
{
  ...user,
  address: {
    ...user.address,
    city: "Visakhapatnam"
  }
}
```

creates:

```text
updatedUser
   │
   ├── name ─────────────── same primitive
   │
   └── address ─────────── NEW object
                              │
                              ├── city → NEW value
                              └── country → existing value
```

Only the objects along the changed path need new references.

---

# 6. How Do You Immutably Update Arrays?

Use methods that return new arrays.

## Adding an item

```javascript
// Create a new array by adding an item to the end.
const users = ['Ravi', 'Rahul'];

const updatedUsers = [...users, 'Anil'];

console.log(users);
// ["Ravi", "Rahul"]

console.log(updatedUsers);
// ["Ravi", "Rahul", "Anil"]
```

---

## Adding an item at the beginning

```javascript
// Create a new array by adding an item at the beginning.
const users = ['Rahul', 'Anil'];

const updatedUsers = ['Ravi', ...users];

console.log(updatedUsers);
// ["Ravi", "Rahul", "Anil"]
```

---

# 7. How Do You Immutably Remove an Array Item?

Use `filter()`.

```javascript
// Create a new array without the user named Rahul.
const users = ['Ravi', 'Rahul', 'Anil'];

const updatedUsers = users.filter((user) => user !== 'Rahul');

console.log(updatedUsers);
// ["Ravi", "Anil"]
```

`filter()` does not modify the original array.

---

# 8. How Do You Immutably Update an Array Item?

Use `map()`.

```javascript
// Create a new array with Ravi's age updated.
const users = [
  { id: 1, name: 'Ravi', age: 25 },
  { id: 2, name: 'Rahul', age: 28 },
];

const updatedUsers = users.map((user) => (user.id === 1 ? { ...user, age: 26 } : user));

console.log(updatedUsers);
```

The important pattern is:

```javascript
// Create a new object only for the item that changed.
user.id === 1 ? { ...user, age: 26 } : user;
```

The unchanged items can keep their existing references.

---

# 9. How Do You Immutably Remove an Object from an Array?

Use `filter()`.

```javascript
// Remove the user with ID 2 without mutating the original array.
const users = [
  { id: 1, name: 'Ravi' },
  { id: 2, name: 'Rahul' },
  { id: 3, name: 'Anil' },
];

const updatedUsers = users.filter((user) => user.id !== 2);
```

---

# 10. `sort()` and Immutability

Be careful with `sort()`.

`sort()` **mutates the original array**.

```javascript
// sort() mutates the original array.
const numbers = [3, 1, 2];

numbers.sort();

console.log(numbers);
// [1, 2, 3]
```

Use a copy first:

```javascript
// Copy the array before sorting it.
const numbers = [3, 1, 2];

const sortedNumbers = [...numbers].sort();

console.log(numbers);
// [3, 1, 2]

console.log(sortedNumbers);
// [1, 2, 3]
```

Modern JavaScript also provides `toSorted()`:

```javascript
// toSorted() returns a new sorted array without mutating the original.
const numbers = [3, 1, 2];

const sortedNumbers = numbers.toSorted();

console.log(numbers);
// [3, 1, 2]

console.log(sortedNumbers);
// [1, 2, 3]
```

---

# 11. Immutability in React State

This is one of the most important practical uses.

### ❌ Don't mutate state directly

```javascript
// Do not mutate React state directly.
const [user, setUser] = useState({
  name: 'Ravi',
  age: 25,
});

user.age = 26;
```

### ✅ Create a new state object

```javascript
// Create a new object when updating React state.
setUser((previousUser) => ({
  ...previousUser,
  age: 26,
}));
```

For arrays:

```javascript
// Add a new item without mutating the existing state array.
setUsers((previousUsers) => [...previousUsers, newUser]);
```

Remove:

```javascript
// Remove an item by creating a new filtered array.
setUsers((previousUsers) => previousUsers.filter((user) => user.id !== userId));
```

Update:

```javascript
// Update one item while preserving the other items.
setUsers((previousUsers) =>
  previousUsers.map((user) => (user.id === userId ? { ...user, name: 'Updated Name' } : user)),
);
```

---

# 12. Important: Spread Is a Shallow Copy

This is a common interview trap.

```javascript
// Spread only copies the top-level object.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = {
  ...user,
};

console.log(copy === user);
// false

console.log(copy.address === user.address);
// true
```

The outer object is new, but the nested `address` object is still shared.

Therefore:

```javascript
// Create a new nested object when changing nested data.
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: 'Visakhapatnam',
  },
};
```

Now:

```javascript
console.log(updatedUser !== user);
// true

console.log(updatedUser.address !== user.address);
// true
```

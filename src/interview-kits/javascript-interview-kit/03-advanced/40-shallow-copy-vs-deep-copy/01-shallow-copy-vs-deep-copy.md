# Shallow Copy vs Deep Copy

**Shallow copy vs deep copy** is about how JavaScript copies objects and arrays, especially when they contain nested objects. The key concept is **reference sharing**: a shallow copy creates a new outer object but can still share nested references.

---

## 1. What is Reference Assignment?

**Definition:**  
Reference assignment does **not create a copy** of an object. Both variables point to the **same object in memory**.

```javascript
// Both variables point to the same object.
const user = {
  name: 'Ravi',
  age: 25,
};

const anotherUser = user;

anotherUser.age = 26;

console.log(user.age); // 26
console.log(anotherUser.age); // 26
console.log(user === anotherUser); // true
```

### Why?

Objects are reference values.

```text
user ──────────────┐
                   ↓
              ┌──────────┐
              │  Object  │
              │ age: 26  │
              └──────────┘
                   ↑
                   │
anotherUser ───────┘
```

So:

```javascript
// This compares object references, not object contents.
console.log(user === anotherUser);
// true
```

---

# 2. What is a Shallow Copy?

**Definition:**  
A **shallow copy** creates a new outer object, but nested objects and arrays are still copied by reference.

```javascript
// Spread creates a shallow copy of the outer object.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = {
  ...user,
};

console.log(user === copy);
// false

console.log(user.address === copy.address);
// true
```

The outer objects are different:

```text
user ───────→ Object A
                 │
                 └── address ──→ Object C


copy ───────→ Object B
                 │
                 └── address ──→ Object C
```

Notice that both `user` and `copy` share the same `address`.

---

# 3. What is a Deep Copy?

**Definition:**  
A **deep copy** creates a completely independent copy of the object, including its nested objects and arrays.

```javascript
// structuredClone() creates an independent deep copy.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = structuredClone(user);

copy.address.city = 'Hyderabad';

console.log(user.address.city);
// Bhubaneswar

console.log(copy.address.city);
// Hyderabad

console.log(user.address === copy.address);
// false
```

Conceptually:

```text
user ─────→ Object A
              │
              └── address ──→ Object C


copy ─────→ Object B
              │
              └── address ──→ Object D
```

There are no shared nested object references in this example.

---

# 4. What Does the Spread Operator Do?

**Definition:**  
The object spread operator (`...`) creates a **shallow copy** of an object.

```javascript
// Spread creates a new top-level object.
const user = {
  name: 'Ravi',
  age: 25,
};

const copy = {
  ...user,
};

console.log(copy);
// { name: "Ravi", age: 25 }

console.log(user === copy);
// false
```

However, nested objects remain shared.

```javascript
// Nested objects are still shared after a spread copy.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = {
  ...user,
};

copy.address.city = 'Hyderabad';

console.log(user.address.city);
// Hyderabad
```

This happens because:

```javascript
// The nested reference is copied, not the nested object itself.
copy.address === user.address;
// true
```

---

# 5. Does Spread Work the Same Way for Arrays?

Yes.

**Definition:**  
Array spread creates a **shallow copy** of the array.

```javascript
// Array spread creates a new outer array.
const numbers = [1, 2, 3];

const copy = [...numbers];

console.log(numbers === copy);
// false
```

But nested arrays are still shared:

```javascript
// Nested arrays remain shared in a shallow copy.
const numbers = [
  [1, 2],
  [3, 4],
];

const copy = [...numbers];

copy[0].push(99);

console.log(numbers);
// [[1, 2, 99], [3, 4]]
```

Because:

```javascript
// Both arrays contain the same nested array reference.
console.log(numbers[0] === copy[0]);
// true
```

---

# 6. What is `Object.assign()`?

**Definition:**  
`Object.assign()` copies enumerable own properties from one or more source objects into a target object.

It performs a **shallow copy**, not a deep copy.

```javascript
// Object.assign() creates a shallow copy.
const user = {
  name: 'Ravi',
  age: 25,
};

const copy = Object.assign({}, user);

console.log(copy);
// { name: "Ravi", age: 25 }

console.log(user === copy);
// false
```

Nested objects are still shared:

```javascript
// Object.assign() does not clone nested objects.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = Object.assign({}, user);

copy.address.city = 'Hyderabad';

console.log(user.address.city);
// Hyderabad
```

So:

```text
Object.assign()
      ↓
Shallow Copy
      ↓
Top-level properties → copied
Nested objects       → shared references
```

---

# 7. Spread vs `Object.assign()`

Both commonly perform shallow copies.

```javascript
// Spread and Object.assign() both create shallow copies.
const user = {
  name: 'Ravi',
  age: 25,
};

const copy1 = { ...user };
const copy2 = Object.assign({}, user);
```

For simple object copying, spread syntax is generally easier to read.

| Feature               | Spread       | `Object.assign()`        |
| --------------------- | ------------ | ------------------------ |
| Creates shallow copy  | ✅           | ✅                       |
| Copies nested objects | ❌           | ❌                       |
| Mutates source        | ❌           | ❌                       |
| Mutates target        | N/A          | ✅                       |
| Common syntax         | `{ ...obj }` | `Object.assign({}, obj)` |
| Deep copy             | ❌           | ❌                       |

An important distinction is that `Object.assign(target, source)` **mutates the target object**.

```javascript
// Object.assign() writes properties into the target object.
const target = {
  name: 'Original',
};

const source = {
  age: 25,
};

Object.assign(target, source);

console.log(target);
// { name: "Original", age: 25 }
```

---

# 8. What is `structuredClone()`?

**Definition:**  
`structuredClone()` creates a **deep clone** using the structured clone algorithm.

```javascript
// structuredClone() creates independent nested objects.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = structuredClone(user);

copy.address.city = 'Hyderabad';

console.log(user.address.city);
// Bhubaneswar

console.log(copy.address.city);
// Hyderabad
```

Unlike spread:

```javascript
// The nested objects have different references.
console.log(user.address === copy.address);
// false
```

---

# 9. Why Doesn't Spread Perform a Deep Clone?

Because spread only copies the **first level** of properties.

Consider:

```javascript
// The nested address object remains the same reference.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = {
  ...user,
};
```

Think of it as:

```text
Original
┌───────────────────┐
│ name              │
│ address ──────────┼──────┐
└───────────────────┘      │
                           ↓
                     ┌─────────────┐
                     │ city        │
                     │ Bhubaneswar │
                     └─────────────┘


Copy
┌───────────────────┐
│ name              │
│ address ──────────┼──────┘
└───────────────────┘
```

The `address` reference is copied.

The `address` object itself is not cloned.

---

# 10. Nested Object References

This is the most important concept to understand.

```javascript
// Both variables reference the same nested object.
const original = {
  user: {
    name: 'Ravi',
  },
};

const copy = {
  ...original,
};

console.log(original === copy);
// false

console.log(original.user === copy.user);
// true
```

So changing the nested object affects both:

```javascript
// Mutating the shared nested object affects the original.
copy.user.name = 'Rahul';

console.log(original.user.name);
// Rahul
```

This is the main reason a shallow copy is **not enough** when you need a completely independent nested structure.

---

# 11. How Do You Immutably Update a Nested Object?

You don't always need a deep clone.

In React, for example, you normally create new references only along the path that changed.

```javascript
// Create new references only for the objects being updated.
const user = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
    country: 'India',
  },
};

const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: 'Hyderabad',
  },
};
```

Now:

```javascript
// The changed objects have new references.
console.log(updatedUser !== user);
// true

console.log(updatedUser.address !== user.address);
// true
```

But unrelated nested values can still be shared safely.

This pattern is called **structural sharing**.

---

# 12. `JSON.parse(JSON.stringify())` vs `structuredClone()`

A common old technique for deep cloning is:

```javascript
// JSON serialization can produce a deep-looking copy but has limitations.
const copy = JSON.parse(JSON.stringify(original));
```

This is **not a general-purpose deep clone**.

It can lose or change certain values such as:

- `Date`
- `Map`
- `Set`
- `undefined`
- `BigInt`
- Functions
- Special object types

For example:

```javascript
// JSON serialization converts Date into a string.
const original = {
  createdAt: new Date(),
};

const copy = JSON.parse(JSON.stringify(original));

console.log(typeof original.createdAt);
// object

console.log(typeof copy.createdAt);
// string
```

For supported values, `structuredClone()` is usually the appropriate built-in API when you genuinely need a deep clone.

---

# 13. What Can `structuredClone()` Handle?

`structuredClone()` supports many built-in data types, including:

```text
Object
Array
Date
Map
Set
RegExp
ArrayBuffer
Typed Arrays
```

Example:

```javascript
// structuredClone() preserves supported built-in types such as Date and Map.
const original = {
  date: new Date(),
  tags: new Set(['React', 'JavaScript']),
  scores: new Map([['Ravi', 95]]),
};

const copy = structuredClone(original);

console.log(copy.date instanceof Date);
// true

console.log(copy.tags instanceof Set);
// true

console.log(copy.scores instanceof Map);
// true
```

However, it does **not** clone everything. For example, functions cannot be cloned using `structuredClone()`.

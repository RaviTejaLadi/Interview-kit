## Quick Interview Example 🧠

Consider:

```javascript
// Determine which references are shared after a shallow copy.
const original = {
  name: 'Ravi',
  address: {
    city: 'Bhubaneswar',
  },
};

const copy = {
  ...original,
};
```

What are the results?

```javascript
// Compare the outer object and nested object references.
console.log(original === copy);
console.log(original.address === copy.address);
```

Answer:

```text
false
true
```

Why?

```text
original ─────→ Object A
                   │
                   └── address ──→ Object C


copy ─────────→ Object B
                   │
                   └── address ──→ Object C
```

The outer object is copied, but the nested `address` object is shared.

---

# Key Interview Points

### Reference assignment

```javascript
// No copy is created; both variables share the same reference.
const copy = original;
```

➡️ **No copy**

### Spread

```javascript
// Creates a shallow copy.
const copy = { ...original };
```

➡️ **Shallow copy**

### `Object.assign()`

```javascript
// Creates a shallow copy when using an empty target object.
const copy = Object.assign({}, original);
```

➡️ **Shallow copy**

### `structuredClone()`

```javascript
// Creates a deep clone for values supported by structured clone.
const copy = structuredClone(original);
```

➡️ **Deep copy**

### Most important rule

> **Spread and `Object.assign()` copy references for nested objects; they do not recursively clone the entire object.**

### Easy way to remember 🧠

```text
const copy = original
        ↓
Same object

{ ...original }
        ↓
New outer object
        ↓
Nested references shared

Object.assign({}, original)
        ↓
New outer object
        ↓
Nested references shared

structuredClone(original)
        ↓
New outer object
        ↓
New nested objects
        ↓
Independent structure
```

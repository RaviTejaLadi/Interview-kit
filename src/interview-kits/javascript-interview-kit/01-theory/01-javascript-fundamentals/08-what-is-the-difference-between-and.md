# What is the difference between `==` and `===`?

### `==` — Loose Equality

`==` compares values **after performing type coercion when necessary**.

### `===` — Strict Equality

`===` compares both **value and type** without performing the usual implicit type conversion.

```javascript
// Loose equality performs type coercion
console.log(5 == '5'); // true

// Strict equality checks both type and value
console.log(5 === '5'); // false
```

Here:

```text
5       → number
"5"     → string
```

With `==`, JavaScript converts values as part of the comparison.

With `===`, different types mean the values are not equal.

### Recommendation

In most application code, prefer:

```javascript
// Prefer strict equality for predictable comparisons
if (userId === 10) {
  console.log('User found');
}
```

Use `==` only when you intentionally want its coercion behavior and understand the comparison rules.

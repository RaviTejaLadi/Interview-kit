# What are rest parameters?

**Rest parameters** collect multiple arguments into an array.

They use the `...` syntax.

```javascript
// Rest parameters collect all remaining arguments into an array.
function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(10, 20, 30)); // 60
```

You can combine normal parameters with a rest parameter:

```javascript
// The rest parameter collects arguments after the first parameter.
function greet(firstName, ...otherNames) {
  console.log(firstName);
  console.log(otherNames);
}

greet('Ravi', 'Rahul', 'Amit');

// Ravi
// ["Rahul", "Amit"]
```

### Important rule

The rest parameter must be the **last parameter**.

```javascript
// The rest parameter must come last.
// function example(...args, last) {} // ❌ SyntaxError
```

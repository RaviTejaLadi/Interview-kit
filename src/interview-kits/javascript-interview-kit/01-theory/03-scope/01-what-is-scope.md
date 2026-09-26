# What is scope?

**Scope** is the region of a JavaScript program where a variable or function can be accessed.

Think of scope as a **visibility boundary** for variables.

```javascript
// A variable is accessible only within its scope.
function greet() {
  const message = 'Hello';

  console.log(message); // ✅ Accessible
}

greet();

// console.log(message); // ❌ ReferenceError
```

The `message` variable exists only inside the `greet` function.

### Main types of scope

- Global scope
- Function scope
- Block scope
- Module scope

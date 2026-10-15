All three methods can use the same function and object.

```
// Compare how the three methods invoke a function.
function showDetails(age, city) {
  return `${this.name}, ${age}, ${city}`;
}

const user = { name: "Ravi" };

console.log(showDetails.call(user, 25, "Hyderabad"));
console.log(showDetails.apply(user, [25, "Hyderabad"]));

const boundFunction = showDetails.bind(user, 25);
console.log(boundFunction("Hyderabad"));

// All three output:
// Ravi, 25, Hyderabad
```

## Key points to remember

- `call()` — execute now, pass arguments individually.
- `apply()` — execute now, pass arguments as an array.
- `bind()` — execute later, return a new function.

One final gotcha: these implementations are simplified for learning. Native methods have additional rules around strict mode, primitive values, exceptions, constructors, and function metadata. For interviews, explain the core implementation first, then discuss those edge cases if asked.

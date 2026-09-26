# What are parameters and arguments?

### Parameter

A **parameter** is a variable listed in a function definition.

```javascript
// name is a parameter.
function greet(name) {
  console.log(`Hello ${name}`);
}
```

### Argument

An **argument** is the actual value passed when calling the function.

```javascript
// "Ravi" is an argument passed to the name parameter.
greet('Ravi');
```

Think of it as:

```text
Parameter → placeholder
Argument  → actual value
```

```javascript
// Parameters receive the arguments passed to the function.
function add(a, b) {
  return a + b;
}

add(10, 20);
//  a   b
// 10  20
```

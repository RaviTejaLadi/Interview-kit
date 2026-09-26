# What are default parameters?

**Default parameters** allow a function to use a default value when an argument is `undefined` or omitted.

```javascript
// The default value is used when name is undefined.
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}

greet('Ravi'); // Hello, Ravi
greet(); // Hello, Guest
greet(undefined); // Hello, Guest
```

But `null` does not trigger the default:

```javascript
// null is an explicit value, so the default is not used.
function greet(name = 'Guest') {
  console.log(name);
}

greet(null); // null
```

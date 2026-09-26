# What are callback functions?

A **callback function** is a function passed to another function so that it can be called later or at an appropriate point.

```javascript
// The callback is executed after the operation completes.
function processUser(name, callback) {
  console.log(`Processing ${name}`);

  callback();
}

processUser('Ravi', () => {
  console.log('Done');
});
```

Callbacks are common in:

- Array methods
- Event handlers
- Timers
- Asynchronous operations
- APIs

Example:

```javascript
// forEach receives a callback function for each array element.
const numbers = [1, 2, 3];

numbers.forEach((number) => {
  console.log(number);
});
```

Here, the arrow function passed to `forEach()` is the callback.

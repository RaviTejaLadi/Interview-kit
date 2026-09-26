# What is `null`?

`null` represents an **intentional absence of a value**.

You explicitly assign `null` when you want to say:

> "There is currently no value here."

```javascript
// Explicitly representing the absence of a value.
const selectedUser = null;

console.log(selectedUser); // null
```

For example:

```javascript
// null can represent an intentionally empty state.
let currentUser = null;

// Later, a user is assigned.
currentUser = {
  name: 'Ravi',
};
```

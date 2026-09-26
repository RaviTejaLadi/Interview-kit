# Arrow function vs regular function.

The biggest differences are related to **`this`**, `arguments`, constructors, and syntax.

| Feature              | Regular Function | Arrow Function |
| -------------------- | ---------------- | -------------- |
| Syntax               | Longer           | Concise        |
| Own `this`           | ✅ Yes           | ❌ No          |
| Own `arguments`      | ✅ Yes           | ❌ No          |
| Can use `new`        | ✅ Yes           | ❌ No          |
| `prototype` property | ✅ Yes           | ❌ No          |
| `this` behavior      | Dynamic          | Lexical        |

### The biggest difference: `this`

Arrow functions don't create their own `this`. They use `this` from the surrounding lexical scope.

```javascript
// Arrow functions capture this from their surrounding scope.
const user = {
  name: 'Ravi',

  greet() {
    const sayHello = () => {
      console.log(this.name);
    };

    sayHello();
  },
};

user.greet(); // Ravi
```

A regular function has its own `this` depending on how it is called.

### Arrow functions cannot be constructors

```javascript
// Arrow functions cannot be called with new.
const User = (name) => {
  this.name = name;
};

// new User("Ravi"); // TypeError
```

**Interview tip:** Arrow functions are especially useful for callbacks because their lexical `this` avoids many common `this`-binding problems.

## `this`: 20 Output-Based Interview Questions

In JavaScript, `this` refers to a value determined mainly by how a function is called, not where the function is defined. Arrow functions are the exception because they inherit `this` from their surrounding lexical scope.

These 20 output-based questions cover regular functions, arrow functions, object methods, and `call()`, `apply()`, and `bind()`.

## 1. Regular Functions

### Q1. `this` in a regular function

Predict the output.

```
// Q1: this in a regular function called in strict mode
function show() {
  "use strict";
  console.log(this);
}

show();
```

Output

```
undefined
```

Explanation: A regular function called without a receiver gets `undefined` as `this` in strict mode. In a classic browser script without strict mode, it generally gets `window` instead.

### Q2. Regular function called as an object method

```
// Q2: The calling object determines this
const user = {
  name: "Ravi",
  show: function () {
    console.log(this.name);
  },
};

user.show();
```

Output

```
Ravi
```

Explanation: Because the call is `user.show()`, `this` refers to `user`.

### Q3. Detached method

```
// Q3: Extracting a method loses its original receiver
const user = {
  name: "Ravi",
  show() {
    console.log(this.name);
  },
};

const fn = user.show;
fn();
```

Output in a strict-mode context

```
TypeError: Cannot read properties of undefined (reading 'name')
```

Explanation: Assigning the method to `fn` does not preserve its original receiver. The standalone call has `this === undefined` in strict mode, so accessing `this.name` throws an error.

### Q4. Nested regular function

```
// Q4: A nested regular function gets its own this
const user = {
  name: "Ravi",
  show() {
    function inner() {
      console.log(this);
    }

    inner();
  },
};

user.show();
```

Output in a strict-mode context

```
undefined
```

Explanation: The outer method is called on `user`, but `inner()` is a separate regular function called without a receiver. It does not automatically inherit the outer method's `this`.

### Q5. Using an alias to preserve `this`

```
// Q5: Store the method's this in a local variable
const user = {
  name: "Ravi",
  show() {
    const self = this;

    function inner() {
      console.log(self.name);
    }

    inner();
  },
};

user.show();
```

Output

```
Ravi
```

Explanation: `self` captures the reference to `user`. The inner function can access it through the enclosing lexical scope.

## 2. Arrow Functions

Arrow functions do not create their own `this`. They use the `this` value from their surrounding lexical environment.

### Q6. Arrow function inside an object

```
// Q6: An object literal does not establish a lexical this for its arrow
const user = {
  name: "Ravi",
  show: () => {
    console.log(this.name);
  },
};

user.show();
```

Output in a browser classic script with no global name property

```
undefined
```

Explanation: The arrow function inherits `this` from the surrounding scope, not from `user`. In a browser classic script, that surrounding `this` is typically `window`; in an ES module, it is `undefined`.

### Q7. Arrow function nested inside a method

```
// Q7: The arrow inherits this from the show method
const user = {
  name: "Ravi",
  show() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  },
};

user.show();
```

Output

```
Ravi
```

Explanation: `show()` is called as `user.show()`, so its `this` is `user`. The arrow function inherits that value.

### Q8. Arrow function stored separately

```
// Q8: Calling the arrow through another object cannot change its this
const user = {
  name: "Ravi",
  show: () => console.log(this.name),
};

const other = {
  name: "Teja",
};

other.show = user.show;
other.show();
```

Output in a browser classic script with no global name property

```
undefined
```

Explanation: Even though the arrow is called as `other.show()`, its `this` is lexical. Assigning it to another object cannot change that value.

### Q9. Arrow function inside `setTimeout()`

```
// Q9: The arrow callback inherits this from the method
const user = {
  name: "Ravi",
  show() {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  },
};

user.show();
```

Output after approximately 100 ms

```
Ravi
```

Explanation: The arrow callback inherits `this` from `show()`, which was called on `user`.

### Q10. Regular callback vs arrow callback

```
// Q10: Compare this in regular and arrow callbacks
const user = {
  name: "Ravi",

  regular() {
    setTimeout(function () {
      console.log(this.name);
    }, 100);
  },

  arrow() {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  },
};

user.regular();
user.arrow();
```

Output in a browser, assuming no global `name` value interferes

```
undefined
Ravi
```

Explanation:

- The regular callback has its own `this`. Browser timer callbacks generally run with `this` set to `window`, so `this.name` is typically `window.name`, commonly an empty string rather than `undefined`. In Node.js, the timer callback's `this` is a `Timeout` object.
- The arrow callback inherits `this` from `arrow()`, which is `user`.

For predictable interview output, remember that regular callbacks may depend on the runtime. The arrow callback prints `Ravi`.

## 3. Object Methods

### Q11. Method shorthand

```
// Q11: Method shorthand uses the call-site receiver
const user = {
  name: "Ravi",
  show() {
    console.log(this.name);
  },
};

user.show();
```

Output

```
Ravi
```

Explanation: Method shorthand does not change regular function `this` rules. The receiver is the object before the dot.

### Q12. Method borrowing

```
// Q12: Borrow a method using another object's receiver
const user1 = {
  name: "Ravi",
  show() {
    console.log(this.name);
  },
};

const user2 = {
  name: "Teja",
};

user2.show = user1.show;
user2.show();
```

Output

```
Teja
```

Explanation: The function is the same, but the call site is `user2.show()`. Therefore, `this` is `user2`.

### Q13. Nested object method

```
// Q13: The inner method's receiver is the nested object
const user = {
  name: "Ravi",
  details: {
    name: "Teja",
    show() {
      console.log(this.name);
    },
  },
};

user.details.show();
```

Output

```
Teja
```

Explanation: The object immediately before `.show()` is `user.details`, not `user`.

### Q14. Method assigned to another variable

```
// Q14: A detached method loses the object receiver
const user = {
  name: "Ravi",
  show() {
    return this.name;
  },
};

const result = user.show;
console.log(result());
```

Output in a strict-mode context

```
TypeError: Cannot read properties of undefined (reading 'name')
```

Explanation: The assignment stores the function reference. It does not permanently bind `this` to `user`.

## 4. `call()`, `apply()`, and `bind()`

These methods let you control `this` for regular functions.

- `call()` invokes the function immediately with arguments supplied individually.
- `apply()` invokes it immediately with arguments supplied as an array (or array-like object).
- `bind()` returns a new function with `this` bound for later invocation.

### Q15. Using `call()`

```
// Q15: call sets this and passes arguments individually
function introduce(city) {
  console.log(`${this.name} lives in ${city}`);
}

const user = { name: "Ravi" };

introduce.call(user, "Hyderabad");
```

Output

```
Ravi lives in Hyderabad
```

Explanation: `call()` invokes `introduce` immediately, with `this` set to `user` and `"Hyderabad"` passed as the first argument.

### Q16. Using `apply()`

```
// Q16: apply passes arguments as an array
function add(a, b) {
  console.log(this.value + a + b);
}

const obj = { value: 10 };

add.apply(obj, [5, 3]);
```

Output

```
18
```

Explanation: `this.value` is `10`; the arguments are `5` and `3`. Their sum is `18`.

### Q17. Using `bind()`

```
// Q17: bind returns a function with a fixed this value
function show() {
  console.log(this.name);
}

const user = { name: "Ravi" };
const boundShow = show.bind(user);

boundShow();
```

Output

```
Ravi
```

Explanation: `bind()` does not invoke the original function. It returns a new function that uses `user` as its `this` value when called normally.

### Q18. `bind()` with preset arguments

```
// Q18: bind can preset arguments as well as this
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: "Ravi" };
const sayHello = greet.bind(user, "Hello");

sayHello("!");
```

Output

```
Hello, Ravi!
```

Explanation: `"Hello"` is preset by `bind()`. The call supplies `"!"` as the remaining argument.

### Q19. Calling a bound function with `call()`

```
// Q19: call cannot override the this value of a bound function
function show() {
  console.log(this.name);
}

const user1 = { name: "Ravi" };
const user2 = { name: "Teja" };

const boundShow = show.bind(user1);

boundShow.call(user2);
```

Output

```
Ravi
```

Explanation: Once the function is bound, calling it with a different receiver through `call()` or `apply()` does not replace the bound `this`.

### Q20. `call()` with an arrow function

```
// Q20: call cannot change an arrow function's lexical this
const user = {
  name: "Ravi",
  show: () => {
    console.log(this.name);
  },
};

user.show.call({ name: "Teja" });
```

Output in a browser classic script with no global name property

```
undefined
```

Explanation: Arrow functions do not have their own `this`. Neither `call()`, `apply()`, nor `bind()` can replace the lexical `this` value of an arrow function.

## Quick revision table

| Function or call type       | How `this` is determined                     |
| --------------------------- | -------------------------------------------- |
| Regular standalone function | `undefined` in strict mode                   |
| Object method               | Object before the dot                        |
| Detached method             | No original receiver is preserved            |
| Arrow function              | Inherited from the surrounding lexical scope |
| `call()`                    | Sets `this` for an immediate invocation      |
| `apply()`                   | Sets `this` for an immediate invocation      |
| `bind()`                    | Returns a function with bound `this`         |
| Bound function + `call()`   | Original bound `this` remains                |
| Arrow + `call()`            | Lexical `this` remains                       |

# What is hoisting?

**Hoisting** is JavaScript's behavior of processing declarations before executing the code in a scope. The important detail is that **hoisting does not mean JavaScript physically moves your code to the top**; declarations are created during the setup phase, but their behavior differs between `var`, `let`, `const`, and functions.

For example:

```javascript
// JavaScript allows var to be referenced before its declaration.
console.log(name); // undefined

var name = 'Ravi';
```

Conceptually, you can think of it as:

```javascript
// Conceptual model — not actual code transformation.
var name;

console.log(name); // undefined

name = 'Ravi';
```

⚠️ JavaScript doesn't literally move the declaration. This is just a useful mental model.

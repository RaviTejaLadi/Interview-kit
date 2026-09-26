# What is variable shadowing?

**Variable shadowing** occurs when a variable declared in an inner scope has the **same name** as a variable in an outer scope.

The inner variable **shadows** the outer variable.

```javascript
// The inner name shadows the outer name.
const name = 'Ravi';

function greet() {
  const name = 'Rahul';

  console.log(name); // "Rahul"
}

greet();

console.log(name); // "Ravi"
```

There are two different `name` variables:

```text
Global scope
└── name = "Ravi"

    Function scope
    └── name = "Rahul"
```

Inside `greet()`, JavaScript finds `"Rahul"` first, so it doesn't continue looking for the global `name`.

### Block shadowing

```javascript
// A block-scoped variable can shadow an outer variable.
const value = 10;

if (true) {
  const value = 20;

  console.log(value); // 20
}

console.log(value); // 10
```

### `var` and `let` gotcha

You cannot redeclare a `let` variable in the same scope:

```javascript
// Redeclaring let in the same scope is not allowed.
let value = 10;

// let value = 20; // ❌ SyntaxError
```

But shadowing it in a nested scope is allowed:

```javascript
// A nested block can shadow an outer let variable.
let value = 10;

{
  let value = 20;

  console.log(value); // 20
}

console.log(value); // 10
```

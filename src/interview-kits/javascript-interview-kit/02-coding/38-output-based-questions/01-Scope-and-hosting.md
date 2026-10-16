## Scope & Hoisting: Output-Based Questions and Answers

Scope and hoisting are important JavaScript concepts for interviews, especially when working with `var`, `let`, `const`, functions, and closures. Below are 20 output-based JavaScript questions with answers and explanations, from beginner to tricky interview level.

## 1. `var` vs `let`

### Q1. Variable redeclaration

Predict the output.

```
// Q1: Compare var and let redeclaration
var a = 10;
var a = 20;

console.log(a);

let b = 10;
// let b = 20; // SyntaxError if uncommented

console.log(b);
```

Output

```
20
10
```

Explanation:

- `var` allows redeclaration within the same scope.
- `let` does not allow redeclaration within the same scope.
- Uncommenting `let b = 20` causes a `SyntaxError`, preventing the script from executing normally.

### Q2. `var` inside a block

```
// Q2: var is not block-scoped
if (true) {
  var x = 10;
}

console.log(x);
```

Output

```
10
```

Explanation: `var` is function-scoped, or global-scoped when declared at the top level of a classic script. It is not limited to the `if` block.

### Q3. `let` inside a block

```
// Q3: let is block-scoped
if (true) {
  let x = 10;
}

console.log(x);
```

Output

```
ReferenceError: x is not defined
```

Explanation: `let` is block-scoped. The variable `x` exists only inside the `if` block.

### Q4. `var` in a loop

```
// Q4: var shares one binding across loop iterations
for (var i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i);
```

Output

```
0
1
2
3
```

Explanation: The loop stops when `i` becomes `3`. Because `var` is not block-scoped, `i` remains accessible after the loop.

### Q5. `let` in a loop

```
// Q5: let is limited to the loop's scope
for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i);
```

Output

```
0
1
2
ReferenceError: i is not defined
```

Explanation: The loop's `let` variable is not accessible outside the loop.

## 2. Variable Hoisting

Hoisting means JavaScript processes declarations before executing the code in their scope. However, `var`, `let`, and `const` behave differently.

### Q6. Accessing `var` before declaration

```
// Q6: var is initialized with undefined during scope setup
console.log(a);
var a = 10;
console.log(a);
```

Output

```
undefined
10
```

Explanation: Conceptually, the code behaves like this:

```
// Q6: Conceptual equivalent illustrating var initialization
var a;
console.log(a);
a = 10;
console.log(a);
```

The declaration is processed before execution, but the assignment remains at its original position.

### Q7. Accessing `let` before declaration

```
// Q7: let is inaccessible before initialization
console.log(a);
let a = 10;
```

Output

```
ReferenceError: Cannot access 'a' before initialization
```

Explanation: `let` is hoisted, but it is not initialized until its declaration executes. The variable cannot be accessed during this period.

### Q8. Accessing `const` before declaration

```
// Q8: const also has a temporal dead zone
console.log(value);
const value = 100;
```

Output

```
ReferenceError: Cannot access 'value' before initialization
```

Explanation: `const` behaves like `let` regarding hoisting and the temporal dead zone. It must also be initialized when declared.

### Q9. Redeclaration with `var` and `let`

```
// Q9: var and let cannot share the same scope declaration
var x = 10;
let x = 20;

console.log(x);
```

Output

```
SyntaxError: Identifier 'x' has already been declared
```

Explanation: A `var` and a `let` declaration cannot use the same identifier in the same scope. This is a syntax error, so the script does not execute normally.

## 3. Function Hoisting

Function declarations and function expressions have different hoisting behavior.

### Q10. Calling a function before declaration

```
// Q10: Function declarations are hoisted with their implementation
greet();

function greet() {
  console.log("Hello JavaScript");
}
```

Output

```
Hello JavaScript
```

Explanation: A function declaration can be called before its position in the source code because its function binding is initialized during scope setup.

### Q11. Function expression with `var`

```
// Q11: Only the var binding is initialized before execution
greet();

var greet = function () {
  console.log("Hello");
};
```

Output

```
TypeError: greet is not a function
```

Explanation: Before the assignment executes, `greet` is `undefined`. Calling `undefined` as a function causes a `TypeError`.

### Q12. Arrow function with `let`

```
// Q12: Arrow function assignment has not executed yet
greet();

let greet = () => {
  console.log("Hello");
};
```

Output

```
ReferenceError: Cannot access 'greet' before initialization
```

Explanation: The `let` binding exists but is in the temporal dead zone when `greet()` is called.

### Q13. Function declaration vs variable declaration

```
// Q13: Function declarations take precedence over var declarations
console.log(typeof greet);

var greet = "Hello";

function greet() {
  return "Hi";
}

console.log(typeof greet);
```

Output

```
function
string
```

Explanation:

- Initially, `greet` refers to the hoisted function.
- The assignment `greet = "Hello"` replaces the function value with a string.
- Therefore, the second `typeof` returns `"string"`.

## 4. Temporal Dead Zone (TDZ)

The TDZ is the period between entering a scope and initializing a `let` or `const` binding.

### Q14. Accessing a variable before its declaration

```
// Q14: The inner let binding shadows the outer variable
let value = 100;

function test() {
  console.log(value);
  let value = 200;
}

test();
```

Output

```
ReferenceError: Cannot access 'value' before initialization
```

Explanation: The local `value` shadows the outer `value` throughout the function scope. Because the local variable has not been initialized, JavaScript does not fall back to the outer variable.

### Q15. `typeof` and the TDZ

```
// Q15: typeof does not bypass the temporal dead zone
console.log(typeof name);
let name = "Ravi";
```

Output

```
ReferenceError: Cannot access 'name' before initialization
```

Explanation: `typeof` returns `"undefined"` for an undeclared identifier, but it throws a `ReferenceError` when accessing a lexical binding in its TDZ.

Compare:

```
// Q15: typeof with an undeclared identifier
console.log(typeof unknownVariable);
```

Output:

```
undefined
```

## 5. Variable Shadowing

Shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope.

### Q16. Basic shadowing

```
// Q16: The inner variable shadows the outer variable
let x = 10;

function test() {
  let x = 20;
  console.log(x);
}

test();
console.log(x);
```

Output

```
20
10
```

Explanation: The inner `x` exists only inside `test()`. The outer `x` remains unchanged.

### Q17. Shadowing with `var`

```
// Q17: A function-scoped var shadows the outer let
let x = 10;

function test() {
  var x = 30;
  console.log(x);
}

test();
console.log(x);
```

Output

```
30
10
```

Explanation: The function's `var x` is a separate local variable. It shadows the outer `let x` without modifying it.

### Q18. Illegal shadowing

```
// Q18: var cannot redeclare a parameter's lexical scope binding
let x = 10;

{
  var x = 20;
}

console.log(x);
```

Output

```
SyntaxError: Identifier 'x' has already been declared
```

Explanation: A `var` declaration is not confined to the block. It conflicts with the existing top-level `let x` in this script.

### Q19. Valid shadowing using a nested block

```
// Q19: let can shadow an outer let in a nested block
let x = 10;

{
  let x = 20;
  console.log(x);
}

console.log(x);
```

Output

```
20
10
```

Explanation: The inner `let x` belongs to a different lexical scope, so the shadowing is valid.

### Q20. Shadowing and the TDZ together

```
// Q20: The inner x shadows the outer x before initialization
let x = 10;

{
  console.log(x);
  let x = 20;
}
```

Output

```
ReferenceError: Cannot access 'x' before initialization
```

Explanation: Even though an outer `x` exists, the inner declaration shadows it throughout the block. The inner variable is still in its TDZ when `console.log(x)` executes.

## Quick revision table

| Concept              | Key rule                                                               |
| -------------------- | ---------------------------------------------------------------------- |
| `var`                | Function-scoped; initialized to `undefined` during scope setup         |
| `let`                | Block-scoped; inaccessible during its TDZ                              |
| `const`              | Block-scoped; TDZ applies; initialization is required                  |
| Function declaration | Can be called before its declaration                                   |
| Function expression  | Function value is assigned only when execution reaches the assignment  |
| TDZ                  | Accessing an uninitialized lexical binding throws `ReferenceError`     |
| Shadowing            | An inner binding hides an outer binding with the same name             |
| Illegal shadowing    | Certain `var` declarations conflict with existing lexical declarations |

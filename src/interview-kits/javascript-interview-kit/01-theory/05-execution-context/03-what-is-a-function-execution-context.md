# What is a function execution context?

Whenever a function is **called**, JavaScript creates a new **Function Execution Context** for that invocation.

```javascript id="u7l1a0"
// Calling greet creates a function execution context.
function greet(name) {
  const message = 'Hello ' + name;

  console.log(message);
}

greet('Ravi');
```

When `greet("Ravi")` executes:

```text
Function Execution Context
──────────────────────────
name = "Ravi"
message = "Hello Ravi"
this = ...
local scope = ...
```

After the function finishes, its execution context is removed from the active call stack.

### Important

Every function call gets its **own execution context**.

```javascript id="4h9k2v"
// Each invocation gets its own function execution context.
function greet(name) {
  console.log(name);
}

greet('Ravi'); // Context 1
greet('Rahul'); // Context 2
```

These are two separate function executions.

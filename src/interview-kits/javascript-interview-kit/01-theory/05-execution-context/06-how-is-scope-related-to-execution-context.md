# How is scope related to execution context?

> 💡 You should understand this concept well enough to explain how JavaScript executes code from start to finish.

**Scope** determines **where variables can be accessed**, while an **execution context** is the environment in which code is currently being executed.

They are closely related but aren't the same concept.

Consider:

```javascript id="qf7p9h"
// The function execution context has access to its local and outer scopes.
const globalName = 'Ravi';

function greet() {
  const message = 'Hello';

  console.log(message);
  console.log(globalName);
}

greet();
```

When `greet()` executes:

```text
Global Scope
│
├── globalName
│
└── Function Scope: greet
    │
    └── message
```

The function execution context can access:

1. Its own variables.
2. Variables from its outer lexical scope.
3. Global variables.

### Scope chain

```text
greet() Execution Context
          │
          ↓
    Function Scope
          │
          ↓
    Global Scope
```

When JavaScript encounters:

```javascript id="o8i0r7"
// JavaScript searches the current scope and then outer scopes.
console.log(globalName);
```

It first searches the current function scope.

If it doesn't find `globalName`, it searches the outer lexical environment, eventually reaching the global scope.

---

# Execution Context vs Scope

This distinction is important in interviews.

| Execution Context                        | Scope                                         |
| ---------------------------------------- | --------------------------------------------- |
| Environment for executing code           | Determines variable visibility                |
| Created when code starts executing       | Determined primarily by lexical structure     |
| Contains execution-related information   | Defines where identifiers can be accessed     |
| Function call creates a function context | Nested functions create nested lexical scopes |
| Associated with the call stack           | Used during identifier lookup                 |

A simple way to remember it:

> **Execution context answers: "Where is this code executing?"**

> **Scope answers: "Which variables can this code access?"**

---

# 🔥 Complete Example

```javascript id="c5t8q7"
// This example demonstrates execution contexts, the call stack, and scope.
const globalValue = 'Global';

function outer() {
  const outerValue = 'Outer';

  function inner() {
    const innerValue = 'Inner';

    console.log(innerValue);
    console.log(outerValue);
    console.log(globalValue);
  }

  inner();
}

outer();
```

### Call stack during `inner()`

```text
┌─────────────────────────┐
│ inner() Execution       │
│ innerValue              │
├─────────────────────────┤
│ outer() Execution       │
│ outerValue              │
├─────────────────────────┤
│ Global Execution        │
│ globalValue             │
└─────────────────────────┘
```

### Scope lookup

When `inner()` accesses `outerValue`:

```text
inner scope
     ↓
outer scope  ← found
     ↓
global scope
```

When it accesses `globalValue`:

```text
inner scope
     ↓
outer scope
     ↓
global scope ← found
```

This is the connection between **execution contexts, lexical scope, and the call stack**.

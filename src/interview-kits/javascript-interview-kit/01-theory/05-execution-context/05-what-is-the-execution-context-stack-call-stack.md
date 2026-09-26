# What is the execution context stack (call stack)?

The **execution context stack**, commonly called the **call stack**, is a stack data structure that tracks currently executing execution contexts.

It follows **LIFO**:

> **Last In, First Out**

The most recently added function executes first and is removed first.

Example:

```javascript id="3e9jcb"
// Nested function calls demonstrate the call stack.
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log('Hello');
}

first();
```

The stack changes like this:

```text
Start:

┌─────────────────┐
│ Global          │
└─────────────────┘
```

After `first()`:

```text
┌─────────────────┐
│ first()         │
├─────────────────┤
│ Global          │
└─────────────────┘
```

After `second()`:

```text
┌─────────────────┐
│ second()        │
├─────────────────┤
│ first()         │
├─────────────────┤
│ Global          │
└─────────────────┘
```

After `third()`:

```text
┌─────────────────┐
│ third()         │ ← Executes first
├─────────────────┤
│ second()        │
├─────────────────┤
│ first()         │
├─────────────────┤
│ Global          │
└─────────────────┘
```

When `third()` finishes, it is popped.

Then `second()` finishes, followed by `first()`.

### Why is the call stack important?

It explains:

- Function execution order
- Nested function calls
- Stack traces
- `RangeError: Maximum call stack size exceeded`
- Synchronous JavaScript execution

For example:

```javascript id="x1sqb4"
// Infinite recursion eventually overflows the call stack.
function infinite() {
  infinite();
}

infinite(); // RangeError: Maximum call stack size exceeded
```

Each recursive call creates another execution context and pushes it onto the stack.

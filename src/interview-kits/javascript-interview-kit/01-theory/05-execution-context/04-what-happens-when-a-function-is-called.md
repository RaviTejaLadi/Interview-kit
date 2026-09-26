# What happens when a function is called?

When a function is called, JavaScript creates a new **function execution context** and pushes it onto the call stack.

Consider:

```javascript id="qz9d6m"
// Calling outer creates a new execution context.
function outer() {
  console.log('Outer');

  inner();
}

function inner() {
  console.log('Inner');
}

outer();
```

The execution happens approximately like this:

### Step 1 — Global context is created

```text
Call Stack

┌────────────────────┐
│ Global Context     │
└────────────────────┘
```

### Step 2 — `outer()` is called

A new function context is pushed.

```text
┌────────────────────┐
│ outer() Context    │
├────────────────────┤
│ Global Context     │
└────────────────────┘
```

### Step 3 — `inner()` is called

Another context is pushed.

```text
┌────────────────────┐
│ inner() Context    │ ← currently executing
├────────────────────┤
│ outer() Context    │
├────────────────────┤
│ Global Context     │
└────────────────────┘
```

### Step 4 — `inner()` finishes

Its context is removed.

```text
┌────────────────────┐
│ outer() Context    │
├────────────────────┤
│ Global Context     │
└────────────────────┘
```

### Step 5 — `outer()` finishes

Its context is removed.

```text
┌────────────────────┐
│ Global Context     │
└────────────────────┘
```

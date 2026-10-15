# Explain the `var` loop closure problem.

Problem: Why do callbacks inside a loop using `var` often print the same final value?

### Code example

```
// Demonstrate the var loop closure problem.
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

Output:

```
3
3
3
```

### Why does this happen?

There are three important things to understand:

1. `var` is function-scoped, not block-scoped.
2. All three callbacks close over the same variable `i`.
3. The callbacks execute later, after the loop has finished and `i` has reached `3`.

The callbacks do not capture separate copies of the value. They access the same variable when they execute.

Execution timeline

## 0

First callback queued

## 1

Second queued

## 3

Loop finishes

Later, all three callbacks read the shared variable, whose value is now 3.

### Fix the problem using an IIFE

An IIFE (Immediately Invoked Function Expression) creates a new function scope for each iteration.

```
// Give each callback its own copy of the current value.
for (var i = 0; i < 3; i++) {
  (function (value) {
    setTimeout(function () {
      console.log(value);
    }, 1000);
  })(i);
}
```

Output:

```
0
1
2
```

Each IIFE invocation gets its own `value` parameter. The callback closes over that parameter, so each callback remembers a different value.

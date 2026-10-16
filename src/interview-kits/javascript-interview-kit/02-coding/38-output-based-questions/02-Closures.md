## Closures: Output-Based Interview Questions

A closure is created when a function remembers variables from its outer lexical scope, even after the outer function has finished executing. Closures are especially important when working with nested functions, loops, `setTimeout()`, event handlers, and asynchronous callbacks.

Below are 15 output-based questions with answers and explanations, from basic to tricky interview level.

## 1. Nested Functions

### Q1. Basic closure

Predict the output.

```
// Q1: Inner function accesses the outer function's variable
function outer() {
  let count = 10;

  function inner() {
    console.log(count);
  }

  inner();
}

outer();
```

Output

```
10
```

Explanation: The `inner()` function accesses `count` from its outer lexical scope. This is the basic behavior behind closures.

### Q2. Outer function finishes execution

```
// Q2: Return the inner function and call it later
function outer() {
  let message = "Hello";

  return function inner() {
    console.log(message);
  };
}

const fn = outer();
fn();
```

Output

```
Hello
```

Explanation: Even after `outer()` finishes, the returned function retains access to `message`.

### Q3. Updating a closed-over variable

```
// Q3: The closure reads the current value of count
function counter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const increment = counter();

increment();
increment();
increment();
```

Output

```
1
2
3
```

Explanation: All three calls use the same `count` variable captured by the returned function. The variable is updated rather than recreated on every call.

### Q4. Two independent closures

```
// Q4: Each counter call creates a separate lexical environment
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counterA = counter();
const counterB = counter();

console.log(counterA());
console.log(counterA());
console.log(counterB());
console.log(counterB());
```

Output

```
1
2
1
2
```

Explanation: `counterA` and `counterB` have separate `count` variables because `counter()` was called twice.

### Q5. Closure with a returned value

```
// Q5: The closure remembers the original parameter
function multiply(x) {
  return function (y) {
    return x * y;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));
console.log(triple(5));
```

Output

```
10
15
```

Explanation: The `double` function remembers `x = 2`, while `triple` remembers `x = 3`.

## 2. Closures in Loops

These are among the most frequently asked JavaScript interview questions. The key difference is whether the loop uses `var` or `let`.

### Q6. `var` with `setTimeout()`

```
// Q6: All callbacks share the same var binding
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

Output after approximately 1 second

```
3
3
3
```

Explanation:

1. `var` creates one shared binding for `i`.
2. The loop finishes before the callbacks execute.
3. At that point, `i` equals `3`.
4. Each callback reads the same variable when it executes.

Remember: closures capture access to variables, not frozen copies of their values.

### Q7. `let` with `setTimeout()`

```
// Q7: let creates a separate binding for each loop iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

Output after approximately 1 second

```
0
1
2
```

Explanation: A `let` declaration in a `for` loop creates a distinct binding for each iteration. Each callback remembers its corresponding iteration's value.

### Q8. Fix the `var` loop using an IIFE

```
// Q8: An IIFE creates a separate parameter binding for each iteration
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 1000);
  })(i);
}
```

Output after approximately 1 second

```
0
1
2
```

Explanation: The immediately invoked function expression (IIFE) receives the current value of `i` as `j`. Each invocation creates its own lexical environment.

### Q9. `var` with synchronous callbacks

```
// Q9: Array callbacks execute synchronously here
for (var i = 0; i < 3; i++) {
  (() => {
    console.log(i);
  })();
}
```

Output

```
0
1
2
```

Explanation: Each IIFE executes immediately, before the loop increments `i`. The callbacks do not wait until the loop finishes.

### Q10. `let` in a loop with two counters

```
// Q10: Each iteration retains its own i binding
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i * 2);
  }, i * 500);
}
```

Output over time

```
2   // after approximately 500 ms
4   // after approximately 1000 ms
6   // after approximately 1500 ms
```

Explanation: The delay is calculated when each timer is scheduled. The callback uses the `i` binding for its iteration, so the values are `1`, `2`, and `3`.

## 3. Closures with Delayed Callbacks

A delayed callback executes after the current synchronous code finishes. This is why the variable's value at execution time can differ from its value when the callback was created.

### Q11. Normal code vs delayed callback

```
// Q11: The callback reads x when it executes
let x = 10;

setTimeout(() => {
  console.log(x);
}, 1000);

x = 20;

console.log(x);
```

Output

```
20
20
```

Explanation:

- `console.log(x)` outside the callback runs immediately and prints `20`.
- The timer callback runs later and also reads `20`.
- The closure retains access to the variable, whose value has changed.

### Q12. Reassigning an outer variable

```
// Q12: The callback uses the latest value of the binding
let message = "Hello";

const greet = () => {
  console.log(message);
};

message = "Welcome";

setTimeout(greet, 500);
```

Output after approximately 500 ms

```
Welcome
```

Explanation: `greet` closes over the `message` variable, not the string `"Hello"` as an immutable snapshot.

### Q13. Capture a value using a function parameter

```
// Q13: The function parameter preserves the value passed at call time
function delayedLog(value) {
  setTimeout(() => {
    console.log(value);
  }, 500);
}

let number = 10;

delayedLog(number);
number = 50;
```

Output after approximately 500 ms

```
10
```

Explanation: `delayedLog(number)` passes the primitive value `10` into the parameter `value`. Reassigning `number` later does not change that parameter.

### Q14. Multiple delayed callbacks with one variable

```
// Q14: Every callback reads the shared variable after the loop
var count = 1;

setTimeout(() => console.log(count), 100);
setTimeout(() => console.log(count), 200);
setTimeout(() => console.log(count), 300);

count = 5;
```

Output

```
5
5
5
```

Explanation: All callbacks access the same `count` binding. The reassignment to `5` happens before any of these timers execute.

### Q15. Closure inside a returned function and a timer

```
// Q15: The timer callback retains access to the counter's local variable
function startCounter() {
  let count = 0;

  return function () {
    setTimeout(() => {
      count++;
      console.log(count);
    }, 500);
  };
}

const increment = startCounter();

increment();
increment();
increment();
```

Output after approximately 500 ms

```
1
2
3
```

Explanation: Each call schedules a callback that shares the same closed-over `count`. When the callbacks execute, they increment the shared variable in execution order.

## Quick revision table

| Scenario                                  | Result                                      |
| ----------------------------------------- | ------------------------------------------- |
| Nested function accesses outer variable   | Reads the outer binding                     |
| Outer function returns an inner function  | Closure preserves access to outer variables |
| Two calls to a counter factory            | Separate state                              |
| `var` with delayed loop callbacks         | Often prints the final loop value           |
| `let` with delayed loop callbacks         | Each iteration retains its own value        |
| Outer variable reassigned before callback | Callback sees the updated value             |
| Value passed as a primitive argument      | Parameter retains the passed value          |
| Multiple callbacks share a closure        | They can update the same state              |

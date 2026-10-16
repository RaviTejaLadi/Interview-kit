## Async Programming: 20 Output-Based Interview Questions

Asynchronous JavaScript allows operations to complete later without blocking the main thread. To solve output-based interview questions, you need to understand Promises, `setTimeout()`, `async/await`, microtasks, and macrotasks.

The most important rule is that synchronous code runs first, Promise callbacks usually run as microtasks, and timer callbacks run as tasks (often called macrotasks). Let's practice these concepts with output and explanations.

## 1. Promises

### Q1. Promise executor vs `.then()`

Predict the output.

```
// Q1: Promise executors run synchronously; then callbacks run later.
console.log("A");

const promise = new Promise((resolve) => {
  console.log("B");
  resolve();
});

promise.then(() => console.log("C"));

console.log("D");
```

Output

```
A
B
D
C
```

Explanation:

- `A` prints first.
- The Promise executor runs immediately, printing `B`.
- `.then()` schedules a microtask.
- `D` prints before the microtask executes.
- Finally, `C` prints.

### Q2. Promise chaining

```
// Q2: Each then callback returns a value to the next callback.
Promise.resolve(10)
  .then((value) => {
    console.log(value);
    return value * 2;
  })
  .then((value) => {
    console.log(value);
    return value + 5;
  })
  .then((value) => console.log(value));

console.log("End");
```

Output

```
End
10
20
25
```

Explanation: `Promise.resolve()` creates an already-fulfilled Promise, but its `.then()` callbacks still run asynchronously as microtasks. Each returned value becomes the next callback's input.

### Q3. Promise rejection

```
// Q3: A catch handler handles a rejected Promise.
Promise.reject("Error")
  .catch((error) => {
    console.log(error);
    return "Recovered";
  })
  .then((value) => console.log(value));

console.log("Start");
```

Output

```
Start
Error
Recovered
```

Explanation: The rejection handler runs as a microtask. Because it returns `"Recovered"`, the next `.then()` receives that value through a fulfilled Promise.

### Q4. Multiple Promise callbacks

```
// Q4: Promise callbacks run in the order they are queued.
Promise.resolve().then(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Output

```
D
A
B
C
```

Explanation: Synchronous code runs first. The three `.then()` callbacks are queued as microtasks in registration order.

## 2. `setTimeout()`

### Q5. Zero-millisecond timer

```
// Q5: A zero-delay timer does not execute immediately.
console.log("Start");

setTimeout(() => console.log("Timer"), 0);

console.log("End");
```

Output

```
Start
End
Timer
```

Explanation: `setTimeout(fn, 0)` schedules a callback to run later. It does not interrupt the current synchronous execution.

### Q6. Multiple timers

```
// Q6: Timers are scheduled with different delays.
setTimeout(() => console.log("A"), 300);
setTimeout(() => console.log("B"), 100);
setTimeout(() => console.log("C"), 200);
```

Typical output order

```
B
C
A
```

Explanation: Assuming the callbacks become eligible in the expected order and the event loop can run them promptly, the 100 ms timer runs before the 200 ms and 300 ms timers. Actual timing is not guaranteed to be exact.

### Q7. Timer vs synchronous loop

```
// Q7: A synchronous loop must finish before a timer callback can run.
setTimeout(() => console.log("Timer"), 0);

for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log("Done");
```

Output

```
0
1
2
Done
Timer
```

Explanation: The loop and final log execute synchronously. The timer callback cannot run until the current JavaScript task finishes.

### Q8. Timer with a changing variable

```
// Q8: The timer callback reads the variable when it executes.
let count = 1;

setTimeout(() => console.log(count), 100);

count = 5;

console.log(count);
```

Output

```
5
5
```

Explanation: The synchronous `console.log()` prints `5`. The timer callback also reads the updated value of `count`, which is `5`.

## 3. `async/await`

### Q9. Basic `async` function

```
// Q9: An async function executes synchronously until it reaches await.
async function greet() {
  console.log("A");
  console.log("B");
}

console.log("Start");

greet();

console.log("End");
```

Output

```
Start
A
B
End
```

Explanation: Calling an `async` function starts executing its body immediately. Since there is no `await` that suspends execution, both logs occur before `"End"`.

### Q10. Execution after `await`

```
// Q10: await suspends the async function until its continuation runs.
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

console.log("Start");
test();
console.log("End");
```

Output

```
Start
A
End
B
```

Explanation:

1. `"Start"` prints.
2. `test()` starts and prints `"A"`.
3. `await` suspends the function.
4. `"End"` prints synchronously.
5. The function resumes in a microtask and prints `"B"`.

### Q11. `await` with a timer

```
// Q11: Awaiting a timer-backed Promise delays the continuation.
async function run() {
  console.log("A");

  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  console.log("B");
}

run();
console.log("C");
```

Output

```
A
C
B
```

Explanation: The Promise is fulfilled by the timer callback. Only after fulfillment can the suspended async function resume and print `"B"`.

### Q12. `async` function returning a value

```
// Q12: An async function wraps its returned value in a Promise.
async function getValue() {
  return 100;
}

console.log("Start");

getValue().then((value) => console.log(value));

console.log("End");
```

Output

```
Start
End
100
```

Explanation: An `async` function always returns a Promise. Its `.then()` callback runs asynchronously, even when the returned value is an ordinary number.

### Q13. Awaiting an ordinary value

```
// Q13: Awaiting a non-Promise value still suspends the async function.
async function test() {
  console.log(1);
  await 10;
  console.log(2);
}

test();
console.log(3);
```

Output

```
1
3
2
```

Explanation: JavaScript treats the awaited value as an already-fulfilled Promise-like result. The continuation after `await` runs asynchronously as a microtask.

## 4. Microtasks vs Macrotasks

Microtasks include Promise reactions and async-function continuations. Timer callbacks are tasks, commonly called macrotasks in interviews.

The event loop generally follows this sequence:

1\. Run synchronous code

Current call stack

2\. Drain the microtask queue

Promise callbacks · await continuations

3\. Run an eligible task

For example, a setTimeout callback

Repeat the event loop cycle

### Q14. Promise vs `setTimeout()`

```
// Q14: Promise callbacks run before eligible timer tasks.
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Output

```
A
D
C
B
```

Explanation: `"A"` and `"D"` execute synchronously. Then the Promise microtask runs before the timer task.

### Q15. Promise inside a timer

```
// Q15: Microtasks created by a timer run before the next timer task.
setTimeout(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
}, 0);

setTimeout(() => {
  console.log("C");
}, 0);
```

Output in a typical browser event loop

```
A
B
C
```

Explanation: The first timer runs and prints `"A"`. Its Promise callback is queued as a microtask. That microtask runs before the event loop proceeds to the next timer task.

### Q16. Multiple microtasks and a timer

```
// Q16: Microtasks queued during synchronous execution run before the timer.
console.log("Start");

setTimeout(() => console.log("Timer"), 0);

Promise.resolve().then(() => console.log("Promise 1"));
Promise.resolve().then(() => console.log("Promise 2"));

console.log("End");
```

Output

```
Start
End
Promise 1
Promise 2
Timer
```

Explanation: The two Promise callbacks run in queue order after synchronous execution finishes. The timer runs afterward.

### Q17. Nested microtasks

```
// Q17: A newly queued microtask runs after already queued microtasks.
Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("C");
  });
});

Promise.resolve().then(() => {
  console.log("B");
});
```

Output

```
A
B
C
```

Explanation: The first callback prints `"A"` and queues `"C"`. But `"B"` was already in the microtask queue, so it runs before `"C"`.

### Q18. `async/await` vs Promise callbacks

```
// Q18: Await continuations and then callbacks both use microtasks.
async function test() {
  console.log("A");
  await null;
  console.log("B");
}

test();

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Output

```
A
D
B
C
```

Explanation: The async function prints `"A"` immediately. Its continuation is queued when it reaches `await null`, before the subsequent `.then()` callback is registered. Therefore, `"B"` prints before `"C"`.

### Q19. Promise inside `async/await` with a timer

```
// Q19: The async continuation queues a microtask after the timer resolves.
async function run() {
  console.log("A");

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("B");
      resolve();
    }, 0);
  });

  console.log("C");
}

run();

Promise.resolve().then(() => console.log("D"));

console.log("E");
```

Output

```
A
E
D
B
C
```

Explanation:

1. `"A"` prints synchronously.
2. The timer is scheduled.
3. `"E"` prints synchronously.
4. The already-fulfilled Promise schedules `"D"` as a microtask.
5. The timer prints `"B"` and resolves the awaited Promise.
6. The async function resumes and prints `"C"`.

### Q20. Tricky combination: synchronous code, microtasks and timers

```
// Q20: Trace the call stack, microtask queue, and timer queue.
console.log("1");

setTimeout(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("4");

  setTimeout(() => {
    console.log("5");
  }, 0);
});

async function test() {
  console.log("6");
  await Promise.resolve();
  console.log("7");
}

test();

console.log("8");
```

Output

```
1
6
8
4
7
2
3
5
```

Explanation step by step:

| Step | Reason                                          |
| ---- | ----------------------------------------------- |
| `1`  | Synchronous execution                           |
| `6`  | `test()` starts immediately                     |
| `8`  | Remaining synchronous execution                 |
| `4`  | First queued Promise microtask                  |
| `7`  | Async continuation queued by `await`            |
| `2`  | First timer callback                            |
| `3`  | Microtask created inside that timer             |
| `5`  | Timer scheduled by the earlier Promise callback |

The key detail is that the event loop processes the available microtasks before moving on to another timer task.

## Quick revision table

| Concept                 | Interview rule                                                  |
| ----------------------- | --------------------------------------------------------------- |
| Promise executor        | Runs synchronously                                              |
| `.then()` / `.catch()`  | Callback runs as a microtask                                    |
| `setTimeout()`          | Schedules a timer task                                          |
| `async` function        | Executes immediately until it suspends                          |
| `await`                 | Suspends the async function and schedules its continuation      |
| `Promise.resolve()`     | Creates a fulfilled Promise; reactions still run asynchronously |
| Nested microtasks       | Already-queued microtasks run first                             |
| Timer-created microtask | Runs before the next task after the current task completes      |
| `setTimeout(fn, 0)`     | Does not mean immediate execution                               |
| Microtask queue         | Normally drained before the next task begins                    |

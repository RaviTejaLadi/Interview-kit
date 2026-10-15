# Sequential Promise execution.

Sequential execution means starting the next asynchronous operation only after the previous one finishes.

Use it when operations depend on earlier results or must happen in a particular order.

### Implementation

// Execute asynchronous tasks sequentially.

```
function delayTask(taskName, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(taskName);
      resolve(taskName);
    }, delay);
  });
}

async function runSequentially() {
  const result1 = await delayTask("Task 1", 1000);
  const result2 = await delayTask("Task 2", 1000);
  const result3 = await delayTask("Task 3", 1000);

  return [result1, result2, result3];
}

runSequentially().then(console.log);
```

Output:

```
Task 1
Task 2
Task 3
["Task 1", "Task 2", "Task 3"]
```

### Execution timeline

Each task starts after the previous task finishes.

Task 1

0s–1s

Task 2

1s–2s

Task 3

2s–3s

Total time: approximately 3 seconds.

### Sequential execution with an array

This pattern is useful when you have a dynamic list of tasks.

// Run an array of asynchronous functions one by one.

```
async function executeSequentially(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

const tasks = [
  () => delayTask("First", 500),
  () => delayTask("Second", 500),
  () => delayTask("Third", 500),
];

executeSequentially(tasks).then(console.log);
```

Notice that the array contains functions returning promises, not promises that have already started. This lets each task begin only when the loop reaches it.

If a task rejects, this implementation stops at that task. Use `try...catch` inside the loop if you want to record failures and continue.

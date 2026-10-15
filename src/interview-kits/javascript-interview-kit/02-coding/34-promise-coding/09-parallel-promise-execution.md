# Parallel Promise execution.

Parallel execution means starting multiple asynchronous operations without waiting for each one to finish before starting the next.

In JavaScript, this typically means concurrent asynchronous operations rather than CPU work executing simultaneously on separate cores.

### Implementation

// Start all tasks before waiting for their results.

```
function delayTask(taskName, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(taskName);
      resolve(taskName);
    }, delay);
  });
}

async function runInParallel() {
  const results = await Promise.all([
    delayTask("Task 1", 1000),
    delayTask("Task 2", 1000),
    delayTask("Task 3", 1000),
  ]);

  return results;
}

runInParallel().then(console.log);
```

Output: The three task logs appear after approximately one second. Their log order may vary if their completion times differ.

```
["Task 1", "Task 2", "Task 3"]
```

### Execution timeline

All tasks begin together and overlap in time.

Task 1

Task 2

Task 3

Total time: approximately 1 second, assuming all tasks take one second and can overlap.

### Sequential vs. parallel

| Feature                | Sequential            | Parallel                                |
| ---------------------- | --------------------- | --------------------------------------- |
| Execution              | One after another     | Overlapping operations                  |
| Typical implementation | `await` inside a loop | `Promise.all()`                         |
| Total duration         | Sum of task durations | Approximately the longest task duration |
| Best for               | Dependent operations  | Independent operations                  |

For three independent requests that each take one second:

- Sequential: approximately 3 seconds.
- Parallel: approximately 1 second.

These are estimates. Actual durations depend on network conditions, scheduling, and resource limits.

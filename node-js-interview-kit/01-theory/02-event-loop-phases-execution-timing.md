# 2. Event Loop Phases & Execution Timing



### Must Know

1. What are the 6 phases of the Libuv Event Loop?
   - Timers phase
   - Pending I/O callbacks phase
   - Idle, prepare phase
   - Poll phase
   - Check phase
   - Close callbacks phase
2. What happens in the Poll phase?
3. What is `process.nextTick()` and how does its microtask queue take priority over all phases?
4. `setImmediate()` vs `setTimeout(fn, 0)`: Which runs first and why?
5. Promise microtasks vs `process.nextTick()`.
6. What is Event Loop Starvation and how do you diagnose it?

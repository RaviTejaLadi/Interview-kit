# 16. Event Loop



### Must Know

1. What is the event loop?
2. Why is JavaScript single-threaded?
3. What is the call stack?
4. What is the callback/task queue?
5. What is the microtask queue?
6. What is a macrotask?
7. What is a microtask?
8. Why do Promises execute before `setTimeout()`?
9. Why doesn't `setTimeout(fn, 0)` execute immediately?
10. How does the event loop handle asynchronous operations?

### 🔥 You MUST be able to predict:

```javascript
// Tests microtask vs macrotask execution order
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

Expected output:

```text
1
4
3
2
```

# The State Batching Timeline

Know how batching behaves across React versions:

```javascript
// Inside a Promise or setTimeout:
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React 17: Triggers 2 separate re-renders
  // React 18: Automatically batched into exactly 1 re-render
}, 100);
```

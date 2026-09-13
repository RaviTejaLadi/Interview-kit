# What is `sessionStorage`?

**`sessionStorage`** is browser storage similar to `localStorage`, but its data is associated with the **page session**.

Data generally remains available while that page session is open and is cleared when the page/tab session ends.

```javascript
// Store temporary data for the current page session.
sessionStorage.setItem('step', '2');

const step = sessionStorage.getItem('step');

console.log(step); // "2"
```

### Common use cases

- Multi-step form progress
- Temporary UI state
- One-tab session data
- Temporary user preferences

### Important difference

```text
localStorage
    ↓
Persists after browser restart

sessionStorage
    ↓
Limited to the current page session
```

`sessionStorage` is also **not automatically sent to the server**.

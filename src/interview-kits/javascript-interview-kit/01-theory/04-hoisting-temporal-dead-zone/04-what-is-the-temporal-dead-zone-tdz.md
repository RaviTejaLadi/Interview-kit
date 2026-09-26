# What is the Temporal Dead Zone (TDZ)?

The **Temporal Dead Zone (TDZ)** is the period between entering a scope and reaching the declaration of a `let`, `const`, or `class` variable.

During this period, the variable exists in the scope but cannot be accessed.

```javascript
// value is in the Temporal Dead Zone here.
console.log(value); // ReferenceError

let value = 10;

// The TDZ ends when execution reaches the declaration.
console.log(value); // 10
```

### Visual representation

```text
Scope starts
     │
     ▼
┌─────────────────────┐
│ Temporal Dead Zone  │
│                     │
│ value exists        │
│ but cannot access   │
└─────────────────────┘
     │
     ▼
let value = 10;
     │
     ▼
TDZ ends
     │
     ▼
value can be accessed
```

### Why does TDZ exist?

TDZ helps catch bugs where variables are accidentally accessed before they are initialized.

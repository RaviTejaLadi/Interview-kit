# How do Feature Flags enable Trunk-Based Development?

A **Feature Flag** is a mechanism that allows you to deploy code without immediately enabling the feature for users.

This solves an important problem:

> **How can I merge incomplete functionality into `main` without exposing it to users?**

Suppose you're building a payment feature.

Instead of keeping the feature branch open for weeks:

```text
feature/payment
       ↓
  not merged
       ↓
   weeks later
```

you can merge small pieces into `main` behind a feature flag.

Conceptually:

```text
main
 │
 ├── Payment code
 │
 └── Feature flag
       │
       ├── ON  → users see payment feature
       │
       └── OFF → users don't see it
```

Example:

```javascript
// Render the new payment UI only when the feature flag is enabled.
function Checkout({ flags }) {
  return (
    <div>
      <h1>Checkout</h1>

      {flags.newPaymentFlow && <NewPaymentFlow />}
    </div>
  );
}
```

The code can be deployed while the feature remains disabled.

Later:

```text
Deploy code
    ↓
Feature OFF
    ↓
Test internally
    ↓
Feature ON
    ↓
Monitor
    ↓
100% users
```

### Feature flags are especially useful for:

- incomplete features
- gradual rollouts
- A/B testing
- beta releases
- emergency feature disabling
- reducing long-lived branches

### Important gotcha

Feature flags should not become permanent technical debt.

A common lifecycle is:

```text
Create flag
   ↓
Develop
   ↓
Deploy
   ↓
Enable
   ↓
Monitor
   ↓
Remove flag + old code
```

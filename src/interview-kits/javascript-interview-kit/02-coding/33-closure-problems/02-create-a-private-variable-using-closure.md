# Create a private variable using closure.

Problem: Create a bank account where the balance cannot be accessed or modified directly from outside the function.

### Code example

```
// Keep the balance private using a closure.
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount <= 0) {
        throw new Error("Deposit must be positive");
      }

      balance += amount;
      return balance;
    },

    withdraw(amount) {
      if (amount <= 0) {
        throw new Error("Withdrawal must be positive");
      }

      if (amount > balance) {
        throw new Error("Insufficient balance");
      }

      balance -= amount;
      return balance;
    },

    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);

console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(200)); // 1300

console.log(account.balance); // undefined
```

### Explanation

- `balance` is declared inside `createBankAccount()`.
- The returned methods form closures over the `balance` variable.
- External code can interact with the balance only through the exposed methods.
- `account.balance` returns `undefined` because `balance` is not a property of the returned object.

This pattern is called data privacy through closures.

Why is it useful?

It protects internal state from accidental changes and lets you control how data is read or modified.

Note that closure-based privacy is an encapsulation technique, not a complete security boundary against malicious code.

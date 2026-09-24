# What is a fake?

**Definition:**
A fake is a simplified but working implementation: in-memory database, fake clock, filesystem in RAM. It behaves like the real thing for the features you need. Fakes stay useful across many tests; stubs are often one-off. Prefer a fake repository over mocking 15 SQL methods.

**Key points:**

- In-memory `UserRepo` with an array.
- MSW is a fake HTTP server at the network boundary.
- Must stay behavior-compatible or tests lie.
- Maintenance cost: update fake when the real contract changes.
- Great for domain tests without Docker.

```javascript
class InMemoryUsers {
  constructor() {
    this.rows = [];
  }
  async insert(user) {
    this.rows.push(user);
    return user;
  }
  async findByEmail(email) {
    return this.rows.find((u) => u.email === email) ?? null;
  }
}
```

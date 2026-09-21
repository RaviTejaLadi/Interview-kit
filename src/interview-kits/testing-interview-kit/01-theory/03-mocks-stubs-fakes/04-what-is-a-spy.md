# What is a spy?

**Definition:**
A spy records how a function was called (args, count) while optionally calling through to the real implementation. Jest's `jest.spyOn(obj, 'method')` is a spy. Use spies to assert a logger was called without replacing the whole module, or to wrap `Date.now`.

**Key points:**
- `spyOn` + `mockRestore` in afterEach.
- Call-through vs full replacement.
- Good for 'did we log the error'.
- Spies on private internals couple tests to implementation.
- Prefer spying at module boundaries you own.

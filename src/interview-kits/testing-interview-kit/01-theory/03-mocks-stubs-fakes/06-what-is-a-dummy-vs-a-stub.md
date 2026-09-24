# What is a dummy vs a stub?

**Definition:**
A dummy is a placeholder required by a signature (`new User(null as any)` — better to use a builder). A stub actually returns data that the SUT reads. If the SUT never reads the collaborator, you needed a dummy (or a simpler API). Builders/factories beat `as any` dummies in TypeScript.

**Key points:**

- If you add `as any` everywhere, the design may be too coupled.
- Test data builders (`aUser({ role: 'admin' })`).
- Dummies should not accidentally get called — that hides bugs.
- Prefer optional params over dummy collaborators.
- This vocabulary scores points in senior interviews.

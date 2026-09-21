# What is testing implementation details?

**Definition:**
Asserting on private state, function call order, CSS class names used only for styling, or React state hooks instead of what the user sees. Those tests fail during refactors that preserve behavior. RTL's guiding principle: test what the user observes.

**Key points:**
- `getByTestId` everywhere is a smell if roles exist.
- `wrapper.state()` was an Enzyme habit.
- Allow `data-testid` for icon-only controls when there is no role/text.
- Assert DOM text, URL, and network when that is the contract.
- White-box tests have a place for complex internals — use sparingly.

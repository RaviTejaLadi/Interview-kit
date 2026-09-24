# How do Jest mocks work at a high level?

**Definition:**
`jest.fn()` creates a spy. `jest.mock('./module')` hoists a mock of the module. `jest.spyOn` wraps an existing method. Manual mocks live in `__mocks__`. ESM vs CJS mocking has gotchas (`unstable_mockModule`). Restore mocks to avoid leaky state.

**Key points:**

- `clearAllMocks` vs `resetAllMocks` vs `restoreAllMocks`.
- Hoisting surprises with `jest.mock`.
- Prefer dependency injection over mocking imports when you can.
- Do not mock the module you are testing.
- Type your mocks (`jest.Mocked<typeof repo>`).

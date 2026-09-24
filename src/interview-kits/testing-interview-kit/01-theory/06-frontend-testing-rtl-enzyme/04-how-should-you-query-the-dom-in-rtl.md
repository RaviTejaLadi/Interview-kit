# How should you query the DOM in RTL?

**Definition:**
Priority: accessible queries (`getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`) then `getByAltText`/`getByTitle`, then `getByTestId` as last resort. `queryBy*` for asserting absence. `findBy*` returns a promise for async appearance. `getBy*` throws if missing — good for happy path.

**Key points:**

- Roles improve a11y as a side effect of testing.
- Avoid CSS selectors and class names.
- `screen` is preferred over destructuring render output.
- `within(section)` to scope queries.
- Multiple matches: `getAllBy*` or more specific name.

```javascript
render(<Login />);
await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');
await userEvent.click(screen.getByRole('button', { name: /log in/i }));
expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
```

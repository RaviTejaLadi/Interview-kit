# Test that a submit button calls onSave with form values

**Definition:**
Fill fields via labels, click submit, assert `onSave` was called with the parsed object. The handler is a prop (dependency injection). Do not inspect React state. This tests the wiring from DOM to callback.

**Key points:**
- `getByLabelText`.
- `jest.fn()` for `onSave`.
- `preventDefault` in the component so jsdom does not navigate.
- Validation: click submit empty and expect no `onSave` + error text.
- Prefer `userEvent.type` over `fireEvent.change`.

```javascript
test('submits the email', async () => {
  const user = userEvent.setup();
  const onSave = jest.fn();
  render(<InviteForm onSave={onSave} />);
  await user.type(screen.getByLabelText(/email/i), 'dev@example.com');
  await user.click(screen.getByRole('button', { name: /send invite/i }));
  expect(onSave).toHaveBeenCalledWith({ email: 'dev@example.com' });
});
```

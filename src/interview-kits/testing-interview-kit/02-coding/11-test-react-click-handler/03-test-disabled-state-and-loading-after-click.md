# Test disabled state and loading after click

**Definition:**
When click triggers async work, the button should disable or show `Saving…`. Use a deferred promise: click, assert loading, then resolve, assert success. This catches double-submit bugs.

**Key points:**

- Deferred promise pattern.
- `toBeDisabled()`.
- Do not `waitFor` a mock call only — wait for UI too.
- user-event + pending fetch needs MSW delay or deferred.
- Reset promise per test.

```javascript
test('disables submit while saving', async () => {
  const user = userEvent.setup();
  let resolve;
  const onSave = jest.fn(
    () =>
      new Promise((r) => {
        resolve = r;
      }),
  );
  render(<InviteForm onSave={onSave} />);
  await user.type(screen.getByLabelText(/email/i), 'dev@example.com');
  await user.click(screen.getByRole('button', { name: /send invite/i }));
  expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
  resolve();
  expect(await screen.findByText(/invite sent/i)).toBeInTheDocument();
});
```

# Conceptually test a button click that increments a counter

**Definition:**
Render the component, query the button by role, `userEvent.click`, assert the visible count. Do not `act` on `useState` directly. This is the canonical RTL interview exercise.

**Key points:**
- `getByRole('button')`.
- `await userEvent.click`.
- Assert text in the document.
- jsdom does not test CSS disabled pointer-events — that needs Playwright if relevant.
- Name the test after the user story.

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('increments the count when the user clicks', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

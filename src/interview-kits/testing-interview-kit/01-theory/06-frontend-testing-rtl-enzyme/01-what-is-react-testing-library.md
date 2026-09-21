# What is React Testing Library?

**Definition:**
RTL (part of Testing Library) tests React components through the DOM the way users and assistive tech do: roles, labels, text, and user-event. It discourages asserting on component instance internals. `render`, `screen`, and `userEvent` are the core API. It is the current React interview standard.

**Key points:**
- `getByRole('button', { name: /submit/i })`.
- `userEvent.click` over `fireEvent` when possible.
- `findBy*` for async UI.
- Works with Jest/Vitest and jsdom.
- Philosophy: 'The more your tests resemble how users use your software, the more confidence they give you.'

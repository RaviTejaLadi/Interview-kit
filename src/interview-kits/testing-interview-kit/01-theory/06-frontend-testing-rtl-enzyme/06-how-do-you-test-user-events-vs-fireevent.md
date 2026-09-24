# How do you test user events vs fireEvent?

**Definition:**
`fireEvent` dispatches a single DOM event. `userEvent` simulates higher-level interactions (click, type, tab) including pointer/keyboard sequences closer to real browsers. Prefer `userEvent.setup()`. Use `fireEvent` for rare events user-event does not cover.

**Key points:**

- `userEvent.type` fires keydown/keypress/input.
- Tab order tests need user-event.
- Both run in jsdom — not a real Chrome layout engine.
- Playwright for real browser input.
- Always await userEvent APIs (v14+).

# When is a click test not enough?

**Definition:**
Keyboard users need `user.keyboard('{Enter}')` on focused controls. Mobile hover is not click. Disabled via CSS pointer-events can still be 'clickable' in jsdom. Overlay intercepts in real CSS. Promote those cases to Playwright. Also test that the handler is not called when the form is invalid.

**Key points:**

- a11y: keyboard path.
- Real browser for stacking contexts.
- Double-click / debounce: fake timers.
- Do not claim jsdom proves pixel-perfect UI.
- Complement with one E2E on the real button.

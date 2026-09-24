# What would Enzyme have done differently?

**Definition:**
Enzyme: `shallow(<Counter />)`, `wrapper.find('button').simulate('click')`, `expect(wrapper.state('n')).toBe(1)`. That passes even if the text never renders. RTL would fail if you forgot to render the count. Explain this contrast explicitly — it is the point of the topic.

**Key points:**

- State assertion vs DOM assertion.
- simulate vs userEvent.
- shallow skips child that actually displays the number.
- Migration: rewrite, do not dual-run forever.
- Interviewers want this comparison by name.

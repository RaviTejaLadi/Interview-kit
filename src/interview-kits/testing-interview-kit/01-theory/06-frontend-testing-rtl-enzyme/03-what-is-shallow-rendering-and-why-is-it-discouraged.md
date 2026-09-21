# What is shallow rendering and why is it discouraged?

**Definition:**
Shallow rendering renders one component without children. You assert that a child component received props. Users do not see that; they see the child's DOM. You can mock a child and never know the child crashed. RTL always mounts (jsdom) more fully. Isolated unit tests of a pure view-model remain valid without Enzyme.

**Key points:**
- Prop-passing tests duplicate TypeScript.
- Prefer testing the parent's visible outcome.
- Stub heavy children only when they are true boundaries (maps, ads).
- Component tests + a little E2E beat a pyramid of shallow tests.
- React 18+ concurrent features were a poor fit for Enzyme shallow.

# When is TDD a good fit?

**Definition:**
Clear rules, algorithms, parsers, domain policy, API mappers, and bug fixes (test first that reproduces). Poor fit: spike/exploration of an unknown API, CSS tweaks, throwaway prototypes, or generating tests after a GUI recorder without design. You can TDD the domain and explore the UI.

**Key points:**
- Bug: write failing test, then fix.
- Unknown third-party: spike, then wrap and TDD the wrapper.
- Greenfield domain models love TDD.
- TDD does not replace product discovery.
- Time pressure is when people skip it — and create the pressure later.

# What is outside-in vs inside-out TDD?

**Definition:**
Inside-out (classic): start from domain units, build up. Outside-in (acceptance/ATDD): start from a failing customer test, mock insides, then fill in. London-style TDD uses mocks to design interfaces outside-in. Detroit-style uses more real objects. Both can produce good design if you refactor.

**Key points:**
- Outside-in ties work to user behavior.
- Inside-out is natural for libraries.
- Mocks at the boundary vs fakes inside.
- Cucumber/Gherkin is outside-in when used honestly.
- Do not write Gherkin that restates unit tests in English.

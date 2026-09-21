# How would you explain the pyramid in an interview?

**Definition:**
Draw three layers, assign examples from their stack (pure function, API+Postgres, Playwright checkout), mention flakes and CI time, and say you still keep a handful of E2E for revenue paths. Mention ice-cream cone as what you avoid. If they use Cypress for everything, be diplomatic and talk about moving rules down.

**Key points:**
- Use their product: login, pay, search.
- Quantify: 70/20/10 is a heuristic, not a KPI.
- Static types/lint are not the pyramid but they catch whole classes of bugs.
- Manual exploratory testing still exists beside the pyramid.
- The goal is confidence per minute of CI.

> 💡 Interviewers want trade-offs, not a religious 70/20/10 split.
